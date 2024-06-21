import React from "react";

import "./TaskRatingCard.css"; // Import the CSS file
import CircularProgressBar from "../components4/CircularProgressBar";

const TaskRatingCard = ({ taskObj, index, deleteTask, updateListArray }) => {
  return (
    <div className="task-rating-wrapper">
      <div className="task-rating-top">Ratings</div>
      <div className="task-rating-holder">
        <span className="task-rating-header">{taskObj.taskTitle}</span>

        <CircularProgressBar value={taskObj.rating} />
      </div>
      <p className="task-rating-reviewer">
        {"reviewed by " + taskObj.reviewerName}
      </p>
    </div>
  );
};

export default TaskRatingCard;
