import React, { useEffect, useState } from "react";

import EmployeeCard from "../components3/EmployeeCard";
import "./EmployeeList.css";
import AttributeModal from "../modals/AttributeModal";
import TaskRatingModal from "../modals/TaskRatingModal";
import SearchBar from "../components4/SearchBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useToken from "../utils/useToken";

const EmployeeList = () => {
  const [taskModal, setTaskModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [employee, setEmployee] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchState, setSearchState] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get("searchParam");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { token, setToken } = useToken();
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/employee/getEmployees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        const responsedata = await response.json();

        setEmployeeList(responsedata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAttrRating = (empObj) => {
    setModalOpen(true);

    const attributeGet = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/attributes/" + empObj.designationId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.text();
          alert(data);
        } else {
          const data = await response.json();

          setAttributes(data);
          setEmployee({
            employeeId: empObj.id,
            employeeName:
              empObj.firstName.toUpperCase() +
              " " +
              (empObj.lastName.toUpperCase() ?? ""),
            // Add other employee details as needed
          });
        } // Handle response from the backend
      } catch (error) {
        console.error("Error:", error);
      }
    };

    attributeGet();
  };
  const handleTaskRating = (empObj) => {
    setTaskModal(true);

    const tasksGet = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/employee/tasks/appraisal/" + empObj.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.text();
          setTasks([]);
          // alert(data);
        } else {
          const data = await response.json();

          setTasks(data);
          setEmployee({
            employeeId: empObj.id,
            employeeName:
              empObj.firstName.toUpperCase() +
              " " +
              (empObj.lastName.toUpperCase() ?? ""),
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    tasksGet();
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleTaskCloseModal = () => {
    setTaskModal(false);
  };

  //Taskkkk

  const handleSubmitTaskRatings = (ratings) => {
    console.log("Task Rating Submission", ratings);
    const saveRatings = async () => {
      try {
        let ratingObject = {
          revID: user["id"],
          appraisals: ratings,
        };
        console.log(JSON.stringify(ratingObject));
        console.log(user["id"]);
        console.log(employee.employeeId);
        const response = await fetch(
          "http://localhost:8083/appraisal/addAppraisalTasks/" +
            employee.employeeId,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ratingObject),
          }
        );

        if (!response.ok) {
          {
            ratings = {};
            ratingObject = {};
            alert("Invalid credentials");
          }
        } else {
          const data = await response.text();
          console.log(data);
        } // Handle response from the backend
      } catch (error) {
        console.error("Error:", error);
      }
    };

    saveRatings();
    setTaskModal(false);
  };

  //Attributes
  const handleSubmitRatings = (ratings) => {
    console.log("Submitted ratings:", ratings);

    const saveRatings = async () => {
      try {
        let ratingObject = {
          revId: user["id"],
          ratings: ratings,
        };
        const response = await fetch(
          "http://localhost:8083/attributes/ratings/save/" +
            employee.employeeId,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ratingObject),
          }
        );

        if (!response.ok) {
          {
            alert("Invalid credentials");
          }
        } else {
          const data = await response.text();
          console.log(data);
        } // Handle response from the backend
      } catch (error) {
        console.error("Error:", error);
      }
    };

    saveRatings();
    setModalOpen(false);
  };

  const handleSearchState = (value) => {
    setSearchState(value);
  };
  const handleSearchClick = (value) => {
    if (value.trim() !== "") {
      const encodedSearchParam = encodeURIComponent(inputState.trim());
      navigate(`search?searchParam=${encodedSearchParam}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/employee/search?searchTerm=" + searchState,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        const responsedata = await response.json();

        setEmployeeList(responsedata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchParam) {
          const response = await fetch(
            `http://localhost:8083/employee/search?searchTerm=${searchParam}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const responseData = await response.json();
          console.log(searchParam);
          console.log(response);
          setEmployeeList(responseData);
        } else {
          console.log("Search Param not found in URL");
          const fetchData = async () => {
            try {
              const response = await fetch(
                "http://localhost:8083/employee/getEmployees",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(response);
              const responsedata = await response.json();

              setEmployeeList(responsedata);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };

          fetchData();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParam]);
  return (
    <>
      <div className="employeelife">
        <div className="employeeheader ">
          <h3>Employee Details</h3>
          <SearchBar
            searchValue={handleSearchState}
            searchClick={handleSearchClick}
          />
        </div>
        <div className="employee-container">
          {employeeList &&
            employeeList.map((obj, index) => (
              <EmployeeCard
                taskObj={obj}
                index={index}
                key={index}
                onTaskRatingClick={handleTaskRating}
                onAttrRatingClick={handleAttrRating}
              />
            ))}
        </div>
      </div>

      <AttributeModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        attributes={attributes}
        onSubmit={handleSubmitRatings}
        employee={employee}
      />
      <TaskRatingModal
        isOpen={taskModal}
        onClose={handleTaskCloseModal}
        taskRatings={tasks}
        onSubmit={handleSubmitTaskRatings}
        employee={employee}
      />
    </>
  );
};

export default EmployeeList;
