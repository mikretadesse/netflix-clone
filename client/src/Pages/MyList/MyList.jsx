import React from "react";
import Styles from "./MyList.module.css";

const MyList = () => {
  return (
    <div className={Styles.mylist_page}>
      <h2 className={Styles.page_title}>My List</h2>
      <div className={Styles.login_prompt}>
        <button className={Styles.login_btn}>Log In</button>
      </div>
    </div>
  );
};

export default MyList;
