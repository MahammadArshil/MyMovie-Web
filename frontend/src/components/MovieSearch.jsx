import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button
} from "@mui/material";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    year: "",
    duration: "",
    sortBy: "releaseDate",
    order: "desc"
  });

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("/api/sorted/getMovie", {
        params: filters
      });
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch movies", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎬 Search Movies
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow">
        
        <TextField
          label="Movie Title"
          name="title"
          value={filters.title}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Genre"
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Release Year"
          name="year"
          type="number"
          value={filters.year}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Max Duration (min)"
          name="duration"
          type="number"
          value={filters.duration}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            name="sortBy"
            value={filters.sortBy}
            label="Sort By"
            onChange={handleChange}
          >
            <MenuItem value="releaseDate">Release Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Order</InputLabel>
          <Select
            name="order"
            value={filters.order}
            label="Order"
            onChange={handleChange}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <div className="md:col-span-3">
          <Button
            variant="contained"
            fullWidth
            onClick={fetchMovies}
            className="bg-black!"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Movie Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {Array.isArray(movies) && movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white rounded-xl shadow hover:scale-105 transition p-4"
          >
            <img
              src={movie.img}
              alt={movie.title}
              className="h-60 w-full object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-3">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {movie.description}
            </p>
            <div className="flex justify-between mt-2 text-sm">
              <span>⭐ {movie.rating}</span>
              <span>
                {new Date(movie.releaseDate).getFullYear()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {movies.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No movies found.
        </p>
      )}
    </div>
  );
};

export default MovieSearch;
