import React from "react";
import classes from "./nav.module.css";
import { useLocation } from "react-router";
import { NavLink, Outlet } from "react-router-dom";
function Nav() {
  const location = useLocation();
  return (
    <>
      <nav className={classes.nav}>
        <h3><NavLink to="/">MessageMe</NavLink></h3>
        <ul className={classes.ul}>
          {location.pathname !== "/signup" && (
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          )}
          {location.pathname !== "/login" && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {location.pathname !== "/requests" && (
            <li>
              <NavLink to="/request">Message Requests(number)</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  );
}

export default Nav;
