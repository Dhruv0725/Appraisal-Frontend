import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "../components3/TaskCard";
import "./TaskPage.css";

import EmployeeSideBar from "../components3/EmployeeSideBar";
import Sidebar from "../components3/SideBar";
import AppraisalFormModal from "../modals/AppraisalFormModal";
import useToken from "../utils/useToken";
const TaskPage = () => {
  const [modal, setModal] = useState(false);
  const [appraisalModal, setAppraisalModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [appraisalState, setAppraisalState] = useState(false);
  const user = sessionStorage.getItem("user");
  const userDetails = user && JSON.parse(user);
  const { token, setToken } = useToken();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/employee/tasks/" + userDetails.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTaskList(data);
        } else {
          console.error("Error fetching Tasks:", response.status);
        }
      } catch (error) {
        console.error("Error fetching Tasks:", error);
      }
    };

    const appraisalValid = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/appraisal/check/" + userDetails.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setAppraisalState(data);
        } else {
          setAppraisalState(false);
        }
      } catch (error) {
        console.error("Error fetching Tasks:", error);
      }
    };
    appraisalValid();
    fetchTasks();
  }, [modal, appraisalModal, setModal, setAppraisalModal]);

  const toggle = () => {
    setModal((prevmodal) => !prevmodal);
  };

  const toggleModal = () => {
    setAppraisalModal((prevmodal) => !prevmodal);
  };

  const saveTask = (taskObj) => {
    if (
      Object.values(taskObj).some((value) => value === null || value === "")
    ) {
      throw new Error("Not fullfilled criteriorn");
    }
    const addTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/employee/tasks/" + userDetails.id,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObj),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setModal(false);
        } else {
          console.error("Error posting Tasks:", response.status);
          setModal(false);
        }
      } catch (error) {
        console.error("Error posting Tasks:", error);
      }
    };

    addTasks();
  };

  return (
    <>
      <Sidebar />
      <div className="tasklife">
        <div className="taskheader ">
          <h3>Task Detail Submission</h3>
          <button className="taskButton" onClick={toggle}>
            Create Tasks
          </button>
          {appraisalState && (
            <button className="appraisalButton" onClick={toggleModal}>
              Apply for Appraisal
            </button>
          )}
        </div>
        <div className="task-container">
          {taskList &&
            taskList.map((obj, index) => (
              <Card
                taskObj={obj}
                index={index}
                appraiseApply={appraisalState}
                onAppraisalClick={toggleModal}
              />
            ))}
        </div>
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
      <AppraisalFormModal
        toggle={toggleModal}
        modal={appraisalModal}
        taskList={taskList}
      />
    </>
  );
};

export default TaskPage;
