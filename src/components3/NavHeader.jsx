import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import NotificationAdmin from "./NotificationBar";
import "./NavHeader.css"; // Import the CSS file
import { StateContext } from "../store/context-store";

function NavHeader() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = useNavigate();
  const stateCtx = useContext(StateContext);
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // useEffect(() => {
  //   const user = sessionStorage.getItem("user");
  //   if (!user) navigation("/login");
  //   const userDetails = JSON.parse(user);
  //   if (userDetails.roleId === null) {
  //     check();
  //   }

  //   if (userDetails.roleId === 0) {
  //     const currentPath = window.location.pathname;
  //     const restrictedPaths = [
  //       "/admin",
  //       "/admin/employeeList",
  //       "/admin/profile",
  //     ];
  //     if (restrictedPaths.includes(currentPath)) {
  //       navigation("/error");
  //     }
  //   } else if (userDetails.roleId === 1) {
  //     const currentPath = window.location.pathname;
  //     const restrictedPaths = ["/task", "/ratings", "/user"];
  //     if (restrictedPaths.includes(currentPath)) {
  //       navigation("/error");
  //     }
  //   }
  // }, []);

  function check() {
    try {
      const data = sessionStorage.getItem("user") || null;

      console.log(data);
      if (data) {
        sessionStorage.removeItem("user");
        stateCtx.logoutstate();
        stateCtx.userState({});
      }
      navigation("/home");
      stateCtx.logoutstate();
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = (e) => {
    console.log("clicked");
    check();
  };

  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <header className="navheader">
      <nav className="nav">
        <div className="flex-container">
          <Link to="/admin-home" className="admin-home">
            <img
              src="https://www.beehyv.com/wp-content/uploads/2020/10/logo.svg"
              className="logo"
              alt="Logo"
            />
          </Link>
          <button className="mobile-menu-btn" onClick={handleMobileMenuToggle}>
            jsadhkjkh
          </button>
          <div
            className={`${isMobileMenuOpen ? "block" : "hidden"} mobile-menu`}
          >
            <ul className="mobile-menu-container">
              <li>
                <NavLink to="/admin-home" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-about" className="nav-link">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-employees" className="nav-link">
                  Employees
                </NavLink>
              </li>
              <li>
                <button onClick={handleClick} className="logout-btn">
                  Logout
                </button>
              </li>
            </ul>
          </div>

          <div className="notification-box">
            <NotificationAdmin />
            <NavLink
              to={user.roleId == 0 ? "/user" : "/admin/profile"}
              className="profile-link"
            >
              <CgProfile size={28} color="#1D85FA" />
            </NavLink>

            <button onClick={handleClick} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavHeader;
