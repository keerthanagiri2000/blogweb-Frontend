import React from "react";
import HIMG from "../Assets/header.jpg";
import Blogs from "./Blogs";
import "./Home.css";
import { useStyles } from "./utils";

const Home = () => {
  const classes = useStyles();
  return (
    <div className="home-container">
      <img src={HIMG} alt="" />
      <div
        className={classes.font}
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginTop: "3rem",
          marginLeft: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Recent Recipes
      </div>
      <div>
        <Blogs />
      </div>
    </div>
  );
};

export default Home;
