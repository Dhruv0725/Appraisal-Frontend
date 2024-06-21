import React, { useContext, useState, useEffect } from "react";
import "./SideBar.css";
import { StateContext } from "../store/context-store";
import { NavLink } from "react-router-dom";

import ratingImg from "../assets/rating.png";
const Sidebar = ({
  onHomeClick,
  onListClick,
  onProfileClick,
  onRatingClick,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const ctxStore = useContext(StateContext);
  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(true);
  };
  useEffect(() => {
    
    const currentPath = window.location.pathname;
    console.log(currentPath);
    const user = sessionStorage.getItem("user");
    if (!user) navigation("/login");
    const userDetails = JSON.parse(user);
    if (userDetails.roleId === null) {
      check();
    }

    if (userDetails.roleId === 0) {
      const currentPath = window.location.pathname;
      console.log(currentPath);
      const restrictedPaths = ["/admin", "/admin/"];
      if (restrictedPaths.includes(currentPath)) {
        navigation("/error");
      }
    }
    if (userDetails.roleId === 1) {
      const currentPath = window.location.pathname;
      const restrictedPaths = [
        "/task",
        "/ratings",
        "/user",
        "/task/",
        "/ratings/",
        "/user/",
      ];
      if (restrictedPaths.includes(currentPath)) {
        navigation("/error");
      }
    }
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_items">
        <NavLink
          to="/home"
          className={({ isActive }) => {
            return isActive ? "active " + "sidebar_item" : "sidebar_item";
          }}
          onClick={onHomeClick}
          end
        >
          <img
            src="data:image/png;base64,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"
            className="fas fa-bars"
          ></img>
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/task"
          className={({ isActive }) => {
            return isActive ? "active " + "sidebar_item" : "sidebar_item";
          }}
          onClick={onListClick}
          end
        >
          <img
            src="data:image/png;base64,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"
            className="fas fa-bars"
          ></img>
          <p>Tasks</p>
        </NavLink>

        <NavLink
          to="/ratings"
          className={({ isActive }) => {
            return isActive ? "active " + "sidebar_item" : "sidebar_item";
          }}
          onClick={onRatingClick}
          end
        >
          <img src={ratingImg} className="fas fa-bars"></img>
          <p>Ratings</p>
        </NavLink>
        <NavLink
          to="/user"
          className={({ isActive }) => {
            return isActive ? "active " + "sidebar_item" : "sidebar_item";
          }}
          onClick={onProfileClick}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PBdZl3e5fvpv5eGYJ5N_0OFI7vnM46PYLw&usqp=CAU"
            className="fas fa-bars"
          ></img>
          <p>Profile</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
