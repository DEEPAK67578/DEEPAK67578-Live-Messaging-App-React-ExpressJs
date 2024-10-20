import { useContext, useEffect, useState } from "react";
import classes from "./nav.module.css";
import { useLocation, useNavigate } from "react-router";
import { NavLink, Outlet } from "react-router-dom";
import { authCtx } from "../../context/auth.context";

function Nav() {
  const location = useLocation();
  const auth = useContext(authCtx);
  const navigate = useNavigate()
  return (
    <>
      <nav className={classes.nav}>
        <h3>
          <NavLink to="/">MessageMe</NavLink>
        </h3>
        <ul className={classes.ul}>
          {!auth.login && location.pathname !== "/signup" && (
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          )}
          {!auth.login && location.pathname !== "/login" && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}

          {auth.login && (
            <p className={classes.name}>Logged in as {auth.name}</p>
          )}

          {location.pathname !== "/messagerequests" && auth.login && (
            <li>
              <NavLink to="/messagerequest">Message Requests</NavLink>
            </li>
          )}

          {location.pathname !== "/chat" && auth.login && (
            <li>
              <NavLink to="/chat">Chat</NavLink>
            </li>
          )}

          {auth.login && (
            <li>
              <button  type="button" onClick={()=> {
                localStorage.removeItem("token")
                localStorage.removeItem("id")
                auth.setToken(null)
                auth.setName(null)
                auth.setLogin(false)
                navigate("/")
              }}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  );
}

export default Nav;
