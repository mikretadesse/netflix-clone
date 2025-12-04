import React from "react";
import { useNavigate } from "react-router-dom"; 
import Styles from "./BrowseByLanguages.module.css";

const BrowseLanguages = () => {
  const navigate = useNavigate(); 

  return (
    <div className={Styles.mylist_page}>
      <h2 className={Styles.page_title}>Browse by Languages</h2>
      <button className={Styles.button} onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};

export default BrowseLanguages;
