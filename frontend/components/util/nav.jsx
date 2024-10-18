import { useContext } from "react";
import classes from "./nav.module.css";
import { useLocation } from "react-router";
import { NavLink, Outlet } from "react-router-dom";
import { authCtx } from "../../context/auth.context";
function Nav() {
  const location = useLocation();
  const auth = useContext(authCtx);
  console.log(auth);
  return (
    <>
      <nav className={classes.nav}>
        <h3>
          <NavLink to="/">MessageMe</NavLink>
        </h3>
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
          {location.pathname !== "/messagerequests" && auth.login && (
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
