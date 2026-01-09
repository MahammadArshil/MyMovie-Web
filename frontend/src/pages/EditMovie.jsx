import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        img: "",
        title: "",
        description: "",
        releaseDate: "",
        rating: "",
        totalRating: 10,
    });

    const token = localStorage.getItem("token");

    //Fetch single movie
    useEffect(() => {
        axios
            .get(`http://localhost:1122/api/getMovie/${id}`)
            .then((res) => setFormData(res.data))
            .catch(() => alert("Failed to load movie"));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:1122/api/admin/editMovie/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("✅ Movie updated successfully");
            navigate("/admin-dashboard");
        } catch (err) {
            alert("❌ Update failed", err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded">
            <h2 className="text-xl font-bold mb-4">Edit Movie</h2>

            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                <input name="img" value={formData.img} onChange={handleChange} placeholder="Image URL" />
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                <textarea name="description" value={formData.description} onChange={handleChange} />
                <input type="date" name="releaseDate" value={formData.releaseDate?.slice(0, 10)} onChange={handleChange} />
                <input type="number" name="rating" value={formData.rating} onChange={handleChange} />

                <button className="bg-blue-600 text-white py-2 rounded">
                    Update Movie
                </button>
            </form>
        </div>
    );
};

export default EditMovie;
