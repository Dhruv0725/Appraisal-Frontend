import React, { useState } from "react";
import "./TaskRatingModal.css";

const handleClickInsideModal = (e) => {
  e.stopPropagation(); // Prevent the click event from bubbling up
};
const TaskRatingModal = ({
  isOpen,
  onClose,
  taskRatings,
  onSubmit,
  employee,
}) => {
  const [tempRatings, setTempRatings] = useState({});

  const handleRatingChange = (id, value) => {
    setTempRatings((prevRatings) => ({
      ...prevRatings,
      [id]: parseInt(value),
    }));
  };

  const handleSubmit = () => {
    const dataToSend = Object.keys(tempRatings).map((id) => ({
      taskId: parseInt(id),
      rating: tempRatings[id],
    }));

    setTempRatings({});

    onSubmit(dataToSend); // Submit array of IDs and ratings
  };

  const closeHandler = () => {
    setTempRatings({});
    onClose();
  };

  let noTasks = taskRatings.length == 0;
  return (
    <div className={`taskRating-modal ${isOpen ? "open" : ""}`}>
      <div className="taskRating-modal-overlay" onClick={closeHandler}></div>
      <div
        className="taskRating-modal-content"
        onClick={handleClickInsideModal}
      >
        <div className="taskRating-modal-header">
          <h2>
            {noTasks
              ? "No tasks added for Appraisal"
              : `Rate Tasks for ${employee.employeeName}`}
          </h2>
          <button className="taskRating-modal-close" onClick={closeHandler}>
            X
          </button>
        </div>
        {taskRatings.map((taskRating) => (
          <div key={taskRating.id}>
            <label htmlFor={`rating-${taskRating.id}`}>
              {taskRating.taskTitle}
            </label>
            <div className="taskrating-modal-bar">
              <input
                type="range"
                id={`rating-${taskRating.id}`}
                min="0"
                max="10"
                value={tempRatings[taskRating.id] || 1}
                onChange={(e) =>
                  handleRatingChange(taskRating.id, Math.max(e.target.value, 1))
                }
              />
              <span>{tempRatings[taskRating.id] || 1}</span>
            </div>
          </div>
        ))}

        {!noTasks && (
          <div className="taskRating-modal-button-container">
            <button className="taskRating-modal-buttons" onClick={handleSubmit}>
              Submit
            </button>
            <button className="taskRating-modal-buttons" onClick={closeHandler}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskRatingModal;
