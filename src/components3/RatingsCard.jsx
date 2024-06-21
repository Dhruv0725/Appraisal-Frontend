import React from "react";

import "./RatingsCard.css"; // Import the CSS file
import CircularProgressBar from "../components4/CircularProgressBar";

const RatingsCard = ({ taskObj, index, deleteTask, updateListArray }) => {
  return (
    <div className="rating-wrapper">
      <div className="rating-top">Ratings</div>
      <div className="rating-holder">
        <span className="rating-header">{taskObj.attribute}</span>

        <CircularProgressBar value={taskObj.rating} />
      </div>
    </div>
  );
};

export default RatingsCard;
