import React, { useState } from "react";
import EditTask from "../modals/EditTask";
import "./TaskCard.css"; // Import the CSS file
import startDateImage from "../assets/startdate.png";
import endDateImage from "../assets/enddate.png";
import editImage from "../assets/edit.png";
import deleteImage from "../assets/delete(1).png";
const TaskCard = ({ taskObj, index, appraiseApply, onAppraisalClick }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = () => {};

  return (
    <div className="card-wrapper">
      <div className="card-top">Task</div>
      <div className="task-holder">
        <span className="card-header">{taskObj.taskTitle}</span>
        <p className="task-description truncate-text">
          {taskObj.taskDescription}
        </p>
        <div className="task-dates">
          <img src={startDateImage} />
          <p>{new Date(taskObj.startTime).toISOString().split("T")[0]}</p>
        </div>

        <div className="task-dates">
          <img src={endDateImage} />
          <p className="task-dates">
            {new Date(taskObj.endTime).toISOString().split("T")[0]}
          </p>
        </div>
        <hr className="taskBorder" />
        <div className="taskCard-footer">
          {appraiseApply && (
            <button className="appraisal-button" onClick={onAppraisalClick}>
              Apply for Appraisal
            </button>
          )}
          {!appraiseApply && (
            <button className="appraised-button" disabled>
              Already Applied for Appraisal
            </button>
          )}
          <div className="card-icons">
            <img
              src={editImage}
              className="card-image"
              onClick={() => setModal(true)}
            ></img>
            <img
              src={deleteImage}
              className="card-image"
              onClick={handleDelete}
            ></img>
          </div>
        </div>
      </div>
      <EditTask modal={modal} toggle={toggle} taskObj={taskObj} />
    </div>
  );
};

export default TaskCard;
