import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCardAdmin from '../components/MovieCardAdmin';

const AdminDashboard = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [movies, setMovies] = useState(
    [{
      img: "",
      title: "",
      description: "",
      releaseDate: "",
      rating: "",
      totalRating: "",
    }]
  );

  const getMovies = async (pageNumber = 1) => {
    const res = await axios.get(
      `http://localhost:1122/api/paginated/getMovie?page=${pageNumber}&limit=8`
    );

    setMovies(res.data.movies);
    setTotalPages(res.data.totalPages);
    setPage(res.data.currentPage);
  };


  useEffect(() => {
    getMovies(page);
  }, [page]);

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-4 mt-3.5 p-5'>
        {
          movies.map((movies) => {
            return (
              <MovieCardAdmin movies={movies} refreshMovies={getMovies} />
            )
          })
        }
      </div>
      <div className="flex justify-center gap-4 mt-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>

        <span className="font-bold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default AdminDashboard;
