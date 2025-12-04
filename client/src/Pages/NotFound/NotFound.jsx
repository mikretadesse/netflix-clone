// src/Pages/NotFound/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <h1 className={Styles.title}>404</h1>
        <h2 className={Styles.subtitle}>Page Not Found</h2>
        <p className={Styles.text}>
          Oops! The page you are looking for does not exist.
        </p>
        <button className={Styles.button} onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
