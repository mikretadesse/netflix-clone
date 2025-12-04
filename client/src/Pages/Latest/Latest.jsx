import React, { useEffect, useState } from "react";
import axios from "axios";
import requests, { IMAGE_BASE_URL } from "../../utils/requests";
import Styles from "./Latest.module.css";

const Latest = () => {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get(requests.fetchTrending);
        setLatest(res.data.results);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchLatest();
  }, []);

  return (
    <div className={Styles.page}>
      <h2 className={Styles.title}>Latest Trending</h2>

      {loading ? (
        <p className={Styles.loading}>Loading...</p>
      ) : (
        <div className={Styles.grid}>
          {latest
            .filter((item) => item.poster_path)
            .map((item) => (
              <div key={item.id} className={Styles.card}>
                <img
                  src={`${IMAGE_BASE_URL}${item.poster_path}`}
                  alt={item.title || item.name}
                  className={Styles.poster}
                />
                <p className={Styles.item_title}>{item.title || item.name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Latest;
