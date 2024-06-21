import React, { useEffect, useMemo, useState } from "react";
import "./NotificationBar.css";
import dropImage from "../assets/dropd.png";
import { useNavigate } from "react-router-dom";

import taskImage1 from "../assets/tasks1.png";
import taskImage2 from "../assets/tasks2.png";
import taskImage3 from "../assets/tasks3.png";
import apprImage from "../assets/done.png";
import useToken from "../utils/useToken";
const NotificationAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const user = sessionStorage.getItem("user");
  const userDetails = user && JSON.parse(user);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { token, setToken } = useToken();

  const imgArray = [taskImage1, taskImage2, taskImage3];

  const randomImageIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < data.length; i++) {
      indices.push(Math.floor(Math.random() * imgArray.length));
    }
    return indices;
  }, [data.length]);

  const getImage = (index) => {
    if (userDetails.roleId === 1) return imgArray[randomImageIndices[index]];
    else return apprImage;
  };

  const handleDelete = (data) => {
    // Implement your delete logic
  };

  const handleClickAll = () => {
    const notificationObject = {
      notifications: data,
    };
    const markAllNotification = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/notifications/read",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(notificationObject),
          }
        );

        if (response.ok) {
          const data = await response.text();
          console.log(data);
          setIsOpen(false);
        } else {
          console.error("Error saving Notification:", response.status);
        }
      } catch (error) {
        console.error("Error saving Notification:", error);
      }
    };

    markAllNotification();
  };

  const handleNotificationClick = (id) => {
    const markNotification = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/notifications/read/" + id,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.text();
          console.log(data);
          setIsOpen(false);
        } else {
          console.error("Error saving Notification:", response.status);
        }
      } catch (error) {
        console.error("Error saving Notification:", error);
      }
    };

    markNotification();
    if (userDetails.roleId === 1) navigate("/admin/employeelist");
    else navigate("/ratings");
  };

  useEffect(() => {
    if (!user || userDetails.roleId === null) {
      sessionStorage.clear();
      navigate("/home");
    }
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/notifications/" + userDetails.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
        } else {
          console.error("Error fetching designations:", response.status);
        }
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchNotifications();
  }, [isOpen]);

  return (
    <>
      <div className="notification-container">
        <button
          id="dropdownHoverButton"
          onClick={toggleDropdown}
          className="notification-button"
          type="button"
        >
          <p>Notifications ({data.length}) </p>
          <img src={dropImage} className="dropdownImage" />
        </button>

        {isOpen && (
          <div id="dropdownHover" className="notification-dropdown">
            <ul className="notification-list">
              {data.length > 0 ? (
                data
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <li
                      key={item.id}
                      className="notification-item"
                      onClick={() => handleNotificationClick(item.id)}
                    >
                      <img src={getImage(index)} />
                      <p className="notification-text">{item.message}</p>
                    </li>
                  ))
              ) : (
                <li className="notification-empty-message">
                  No New Notifications...
                </li>
              )}
            </ul>
            {data.length > 0 && (
              <button
                className="notification-button-item"
                onClick={handleClickAll}
              >
                Mark all as Read
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationAdmin;
