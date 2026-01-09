import axios from "axios";
import { useNavigate } from "react-router-dom";

const MovieCardAdmin = ({ movies, refreshMovies }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(
      `http://localhost:1122/api/admin/deleteMovie/${movies._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    refreshMovies();
  };

  return (
    <div className="border p-3 rounded">
      <img src={movies.img} className="h-40 w-full object-cover" />
      <h3 className="font-bold">{movies.title}</h3>

      <div className="flex gap-2 mt-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => navigate(`/editMovie/${movies._id}`)}
        >
          Edit
        </button>

        <button
          className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCardAdmin;
