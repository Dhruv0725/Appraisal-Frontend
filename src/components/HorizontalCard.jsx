import React from "react";

import classes from "./HorizontalCard.module.css"; // Import your CSS file for styling

export default function HorizontalCard({ imageUrl, title, description }) {
  return (
    <div className={classes.card}>
      <img src={imageUrl} className={classes["card-image"]} alt={title} />
      <div className={classes["card-content"]}>
        <h5 className={classes["card-title"]}>{title}</h5>
        <p className={classes["card-description"]}>{description}</p>
      </div>
    </div>
  );
}
