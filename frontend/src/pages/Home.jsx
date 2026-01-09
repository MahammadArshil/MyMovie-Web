import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import axios from 'axios';

const Home = () => {
  // const Movies = [
  //   {
  //     name: "Iron Man",
  //     year: "2018",
  //     description: "Iron Man Iron Man Tony Stark.",
  //     img: "/vite.svg",
  //     imgAlt: "Iron Man Poster"
  //   },
  //   {
  //     name: "Iron Man",
  //     year: "2018",
  //     description: "Iron Man Iron Man Tony Stark.",
  //     img: "/vite.svg",
  //     imgAlt: "Iron Man Poster"
  //   },
  //   {
  //     name: "Iron Man",
  //     year: "2018",
  //     description: "Iron Man Iron Man Tony Stark.",
  //     img: "/vite.svg",
  //     imgAlt: "Iron Man Poster"
  //   },
  //   {
  //     name: "Iron Man",
  //     year: "2018",
  //     description: "Iron Man Iron Man Tony Stark.",
  //     img: "/vite.svg",
  //     imgAlt: "Iron Man Poster"
  //   },
  //   {
  //     name: "Iron Man",
  //     year: "2018",
  //     description: "Iron Man Iron Man Tony Stark.",
  //     img: "/vite.svg",
  //     imgAlt: "Iron Man Poster"
  //   },
  //   {
  //     name: "Iron Man",
  //     year: "2018",
  //     description: "Iron Man Iron Man Tony Stark.",
  //     img: "/vite.svg",
  //     imgAlt: "Iron Man Poster"
  //   },
  //   {
  //     name: "Iron Man",
  //     year: "2018",
  //     description: "Iron Man Iron Man Tony Stark.",
  //     img: "/vite.svg",
  //     imgAlt: "Iron Man Poster"
  //   }
  // ]

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

  const getMovies = () => {
    axios
      .get("http://localhost:1122/api/getMovie").then(
        async (res) => {
          // console.log(res.data);
          setMovies(res.data);
        });
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-4 mt-3.5 p-5'>
      {
        movies.map((movies, index) => {
          return (
            <MovieCard key={index} movies={movies} />
          )
        })
      }
    </div>
  );
}

export default Home;
