import React, { useEffect, useState } from "react";
import axios from "axios";
import requests, { IMAGE_BASE_URL } from "../../utils/requests";
import Styles from "./Movies.module.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(requests.fetchTopRatedMovies);
        setMovies(res.data.results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className={Styles.page}>
      <h2 className={Styles.title}>Top Rated Movies</h2>

      {loading ? (
        <p className={Styles.loading}>Loading...</p>
      ) : (
        <div className={Styles.grid}>
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <div key={movie.id} className={Styles.card}>
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className={Styles.poster}
                />
                <p className={Styles.movie_title}>{movie.title}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
