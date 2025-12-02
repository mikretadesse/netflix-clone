import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import requests from "../../utils/requests";
import { IMAGE_BASE_URL } from "../../utils/requests";
import Styles from "./Banner.module.css";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(requests.fetchNetflixOriginals);
        setMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ] // Pick a random movie
        );
      } catch (error) {
        console.error("Error fetching banner:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Utility function to truncate text
  const truncate = (str, n) =>
    str?.length > n ? str.substring(0, n - 1) + "..." : str;

  // Show loading state
  if (loading) {
    return <header className={Styles.banner}>Loading...</header>;
  }

  return (
    <div
      className={Styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url(${IMAGE_BASE_URL}${movie.backdrop_path})`
          : "none",
        backgroundPosition: "center center",
      }}>
      <div className={Styles.banner_contents}>
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className={Styles.banner_buttons}>
          <button className={Styles.banner_button} aria-label="Play">
            Play
          </button>
          <button className={Styles.banner_button} aria-label="Add to My List">
            My List
          </button>
        </div>

        <p className={Styles.banner_description}>
          {truncate(movie?.overview, 180)}
        </p>
      </div>

      <div className={Styles.banner_fadeBottom} />
    </div>
  );
};
export default Banner;


/**
 * Banner component displays a featured movie or show as a large banner.
 *
 * - Fetches a random "Netflix Original" movie/show from the API on mount.
 * - Shows the title, description (truncated), and action buttons ("Play", "My List").
 * - Uses the movie's backdrop image as the banner background.
 * - Handles loading and error states gracefully.
 */
