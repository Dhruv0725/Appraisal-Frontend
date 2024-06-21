import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
export default function NavigationBar() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => {
                return isActive ? classes.active : undefined;
              }}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return isActive ? classes.active : undefined;
              }}
              end
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
