import React, { useEffect, useState } from "react";

import "./RatingsPage.css";

import Sidebar from "../components3/SideBar";
import RatingsCard from "../components3/RatingsCard";
import TaskRatingCard from "../components3/TaskRatingCard";
import useToken from "../utils/useToken";
const RatingsPage = () => {
  const [modal, setModal] = useState(false);
  const [ratingList, setRatingList] = useState([]);
  const [appraisedTaskList, setAppraisedTaskList] = useState([]);
  const user = sessionStorage.getItem("user");
  const userDetails = user && JSON.parse(user);
  const { token, setToken } = useToken();
  useEffect(() => {
    const fetchAttributeRatings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/attributes/ratings/" + userDetails.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRatingList(data);
        } else {
          console.error("Error fetching Attribute Ratings:", response.status);
        }
      } catch (error) {
        console.error("Error fetching Attribute Ratings:", error);
      }
    };

    const fetchTaskRatings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/appraisal/" + userDetails.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setAppraisedTaskList(data);
        } else {
          const data = await response.text();
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching TaskRatings:", error);
      }
    };

    fetchTaskRatings();
    fetchAttributeRatings();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="ratinglife">
        <div className="ratingheader ">
          <h3>Ratings</h3>
        </div>
        <div className="taskrating-container">
          <div>
            <h2 className="list-heading">Task Ratings</h2>

            <div className="tasks-ratings">
              {appraisedTaskList &&
                appraisedTaskList.map((obj, index) => (
                  <TaskRatingCard taskObj={obj} index={index} />
                ))}
            </div>
          </div>
        </div>
        <div className="attrrating-container">
          <h2 className="list-heading">Attributes</h2>
          <div className="tasks-ratings">
            {ratingList &&
              ratingList.map((obj, index) => (
                <RatingsCard taskObj={obj} index={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingsPage;
