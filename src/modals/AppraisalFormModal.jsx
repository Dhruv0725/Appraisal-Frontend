import React, { useState, useEffect, useRef } from "react";
import "./AppraisalFormModal.css";
import useToken from "../utils/useToken";
const AppraisalFormModal = ({ toggle, modal, taskList }) => {
  const [admins, setAdmins] = useState([]);

  const [adminState, setAdminState] = useState(0);
  const [taskArray, setTaskArray] = useState([]);
  const user = sessionStorage.getItem("user");
  const userDetails = user && JSON.parse(user);
  const { token, setToken } = useToken();
  const handleSave = () => {
    const postAppraisal = async () => {
      try {
        const tskobject = {
          taskIds: taskArray,
          revId: parseInt(adminState),
        };
        const response = await fetch(
          "http://localhost:8083/employee/tasks/makeAppraisal/" +
            userDetails.id,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tskobject), // Replace with your actual data object
          }
        );
        console.log(tskobject);
        if (response.ok) {
          const data = await response.text();
          alert(data);
        } else {
          const data = await response.text();
          alert(data);
        }
      } catch (error) {
        console.error("Error fetching Tasks:", error);
      }
    };

    const confirmed = confirm(
      `Are you sure? You have added ${taskArray.length} tasks for Appraisal`
    );

    if (confirmed) {
      postAppraisal();
    }

    toggle();
  };

  const checkExistence = (id) => {
    return taskArray.some((ide) => ide === id);
  };

  const handleClick = (id) => {
    setTaskArray((prev) => [...prev, id]);
  };

  const handleModelCloseClidk = () => {
    setTaskArray([]);
    toggle();
  };
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:8083/employee/admins", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();

          setAdmins(data);
        } else {
          console.error("Error fetching designations:", response.status);
        }
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchAdmins();
  }, [modal]);

  return (
    <div className={`appraisal-modal ${modal ? "show" : ""}`}>
      <div className="appraisal-modal-content">
        <div className="appraisal-modal-header">
          <h2 className="heading">Add Appraisal Task</h2>
          <span className="close" onClick={handleModelCloseClidk}>
            &times;
          </span>
        </div>

        <div className="appraisal-existing-tasks">
          {taskList.map((task, index) => (
            <div key={index} className="appraisal-task-item">
              <p>{index + 1}</p>
              <span>{task.taskTitle}</span>
              <button
                className={`add-button ${
                  checkExistence(task.id) ? "disable" : ""
                }`}
                disabled={checkExistence(task.id)}
                onClick={() => handleClick(task.id)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
        <select
          id="admin"
          name="admin"
          onChange={(e) => {
            setAdminState(e.target.value);
          }}
          required
        >
          <option value={0} disabled hidden selected>
            Select Reviewer
          </option>
          {admins.map((admin) => (
            <option key={admin.id} value={admin.id}>
              {admin.firstName + " " + admin.lastName}
            </option>
          ))}
        </select>
        <button
          className={`appraisals-button ${
            adminState == 0 || taskArray.length == 0 ? "disable" : ""
          }`}
          onClick={handleSave}
          disabled={adminState == 0 || taskArray.length == 0}
        >
          Save Task
        </button>
      </div>
    </div>
  );
};

export default AppraisalFormModal;
