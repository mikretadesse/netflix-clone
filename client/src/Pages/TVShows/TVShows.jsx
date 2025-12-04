import React, { useEffect, useState } from "react";
import axios from "axios";
import requests, { IMAGE_BASE_URL } from "../../utils/requests";
import Styles from "./TVShows.module.css";

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await axios.get(requests.fetchNetflixOriginals);
        setShows(res.data.results);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchShows();
  }, []);

  return (
    <div className={Styles.page}>
      <h2 className={Styles.title}>Netflix Originals</h2>

      {loading ? (
        <p className={Styles.loading}>Loading...</p>
      ) : (
        <div className={Styles.grid}>
          {shows
            .filter((show) => show.poster_path)
            .map((show) => (
              <div key={show.id} className={Styles.card}>
                <img
                  src={`${IMAGE_BASE_URL}${show.poster_path}`}
                  alt={show.name}
                  className={Styles.poster}
                />
                <p className={Styles.show_title}>{show.name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TVShows;
