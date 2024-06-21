import React, { useState } from "react";
import EditTask from "../modals/EditTask";
import "./EmployeeCard.css"; // Import the CSS file
import emailImage from "../assets/email.png";
import endDateImage from "../assets/enddate.png";

const EmployeeCard = ({
  taskObj,
  index,

  onTaskRatingClick,
  onAttrRatingClick,
}) => {
  let admintop = taskObj.roleId === 1;

  return (
    <div className="employeecard-wrapper">
      <div className={`employeecard-top ${admintop ? "admintop" : ""}`}>
        {taskObj.roleId == 0 ? "Employee" : "Admin"}
      </div>
      <div className="employee-holder">
        <span className="employeecard-header">
          {taskObj.firstName + " " + taskObj.lastName}
        </span>

        <div className="employee-details">
          <a
            href={`mailto:${taskObj.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="employee-details"
          >
            <img src={emailImage} />
            <p className="email-highlight">{taskObj.email}</p>
          </a>
        </div>

        <p className="employee-designation">{taskObj.designation}</p>
        <div className="employee-details">
          <img src={endDateImage} />
          <p className="employee-date">
            {new Date(taskObj.dateOfJoining).toISOString().split("T")[0]}
          </p>
        </div>

        {!admintop && (
          <div className="employee-ratings">
            <button
              className="employeetask-rating"
              onClick={() => onTaskRatingClick(taskObj)}
            >
              Rate Employee Tasks
            </button>
            <button
              className="employeeAttr-rating"
              onClick={() => onAttrRatingClick(taskObj)}
            >
              Rate Attributes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
