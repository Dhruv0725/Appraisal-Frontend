import React, { useState, useRef } from "react";
import "./CreateTask.css";
const CreateTaskPopup = ({ modal, toggle, save }) => {
  const taskName = useRef("");
  const taskDescription = useRef("");
  const startDate = useRef("");
  const endDate = useRef();
  const [dateState, setDateState] = useState("");

  const handleDateChange = (e) => {
    setDateState(e.target.value);
  };
  const handleSave = (e) => {
    const taskObj = {
      taskTitle: taskName.current.value,
      taskDescription: taskDescription.current.value,
      startTime: startDate.current.value,
      endTime: endDate.current.value,
    };

    save(taskObj);
    taskName.current.value = "";
    taskDescription.current.value = "";
    startDate.current.value = "";
    endDate.current.value = "";
  };

  return (
    <div
      className={`taskmodal ${modal ? "show" : ""}`}
      style={{ display: modal ? "block" : "none" }}
    >
      <div className="taskmodal-dialog">
        <div className="taskmodal-content">
          <div className="taskmodal-header">
            <h5 className="taskmodal-title">Create Task</h5>
            <button className="taskmodal-clsbtn" type="button" onClick={toggle}>
              <span>&times;</span>
            </button>
          </div>
          <div className="taskmodal-body">
            <div className="taskmodal-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                className="taskmodal-control"
                id="taskName"
                ref={taskName}
                name="taskName"
              />
            </div>
            <div className="taskmodal-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows="5"
                className="taskmodal-control"
                id="description"
                ref={taskDescription}
                name="description"
              ></textarea>
            </div>
            <div className="taskmodal-group">
              <label htmlFor="description">Start Date</label>
              <input
                type="date"
                className="taskmodal-control"
                id="startdate"
                name="startdate"
                ref={startDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="taskmodal-group">
              <label htmlFor="description">End Date</label>
              <input
                type="date"
                className="taskmodal-control"
                id="enddate"
                min={dateState}
                name="enddate"
                ref={endDate}
              />
            </div>
          </div>
          <div className="taskmodal-footer">
            <button
              type="button"
              className="taskmodal-button btn-primary"
              onClick={handleSave}
            >
              Create
            </button>
            <button
              type="button"
              className="taskmodal-button btn-secondary"
              onClick={toggle}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPopup;
