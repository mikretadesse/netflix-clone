import React, { useEffect, useState, useRef } from "react";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import styles from "./Row.module.css";
import { IMAGE_BASE_URL } from "../../../utils/requests";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const rowRef = useRef(null);

  // Fetch movies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data?.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [fetchUrl]);

  // Scroll row
  const scroll = (direction) => {
    const { current } = rowRef;
    if (current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      // Update scroll button states
      setTimeout(() => checkScroll(current), 200);
    }
  };

  const checkScroll = (container) => {
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.offsetWidth < container.scrollWidth
    );
  };

  // Trailer handling
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close if already open
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "", {
        id: true,
      })
        .then((id) => {
          if (id) setTrailerUrl(id);
          else console.log("Trailer not found for:", movie?.title);
        })
        .catch(() => setTrailerUrl(""));
    }
  };

  // YouTube options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className={styles.row_container}>
      <h2 className={styles.row_title}>{title}</h2>

      {loading ? (
        <div className={styles.row_skeleton}>Loading...</div>
      ) : (
        <div className={styles.row_wrapper}>
          {/* Left scroll */}
          <button
            className={`${styles.scroll} ${styles.scroll_left}`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}>
            &#10094;
          </button>

          <div className={styles.row_posters} ref={rowRef}>
            {movies
              ?.filter((movie) =>
                isLargeRow ? movie.poster_path : movie.backdrop_path
              )
              .map((movie) => (
                <div
                  key={movie.id}
                  className={`${styles.poster_wrapper} ${
                    isLargeRow ? styles.poster_large : ""
                  }`}>
                  <img
                    onClick={() => handleClick(movie)}
                    className={`${styles.row_poster} ${
                      isLargeRow ? styles.row_poster_large : ""
                    }`}
                    src={`${IMAGE_BASE_URL}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie?.name || movie?.title}
                  />
                  <div className={styles.poster_overlay}>
                    <h3>{movie?.name || movie?.title}</h3>
                    <p>{movie?.overview?.slice(0, 70)}...</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Right scroll */}
          <button
            className={`${styles.scroll} ${styles.scroll_right}`}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}>
            &#10095;
          </button>
        </div>
      )}

      {trailerUrl && (
        <div className={styles.row_trailer}>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
