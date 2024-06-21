import React, { useState, useEffect } from "react";
import "./CreateTask.css";
const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  useEffect(() => {
    setTaskName(taskObj.Name);
    setDescription(taskObj.Description);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    let tempObj = {};
    tempObj["Name"] = taskName;
    tempObj["Description"] = description;
    updateTask(tempObj);
  };

  return (
    <div
      className={`taskmodal ${modal ? "show" : ""}`}
      style={{ display: modal ? "block" : "none" }}
    >
      <div className="taskmodal-dialog">
        <div className="taskmodal-content">
          <div className="taskmodal-header">
            <h5 className="taskmodal-title">Update Task</h5>
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
                value={taskName}
                onChange={handleChange}
                name="taskName"
              />
            </div>
            <div className="taskmodal-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows="5"
                className="taskmodal-control"
                id="description"
                value={description}
                onChange={handleChange}
                name="description"
              ></textarea>
            </div>
            <div className="taskmodal-group">
              <label htmlFor="taskName">Start Date</label>
              <input
                type="date"
                className="taskmodal-control"
                id="startdate"
                value={taskName}
                onChange={handleChange}
                name="startdate"
              />
            </div>
            <div className="taskmodal-group">
              <label htmlFor="taskName">End Date</label>
              <input
                type="date"
                className="taskmodal-control"
                id="enddate"
                value={taskName}
                onChange={handleChange}
                name="enddate"
              />
            </div>
          </div>
          <div className="taskmodal-footer">
            <button
              type="button"
              className="taskmodal-button btn-primary"
              onClick={handleUpdate}
            >
              Update
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

export default EditTaskPopup;
