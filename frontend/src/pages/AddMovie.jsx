import { useState } from "react";
import axios from "axios";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    img: "",
    title: "",
    description: "",
    releaseDate: "",
    rating: "",
    totalRating: 10,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ Get token stored after admin login
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("❌ Admin not logged in");
        setLoading(false);
        return;
      }

      await axios.post(
        "http://localhost:1122/api/admin/addMovie",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 JWT middleware support
          },
        }
      );

      setMessage("✅ Movie added successfully");

      setFormData({
        img: "",
        title: "",
        description: "",
        releaseDate: "",
        rating: "",
        totalRating: 10,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage("❌ Unauthorized / Token expired");
      } else {
        setMessage("❌ Failed to add movie");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin – Add Movie</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={formData.img}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (0–10)"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Movie"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default AddMovie;
