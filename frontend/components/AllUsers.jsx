import React from "react";
import classes from "./AllUsers.module.css";
function AllUsers() {
  return (
    <ul className={classes.users}>
      <li>
        <div className={classes.usersImage}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"></img>
          <h1>UserName</h1>
        </div>
        <p className={classes.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          porro aliquid expedita tempore accusantium est, eos autem nobis eum
          asperiores, libero modi praesentium magni! Ducimus accusantium debitis
          facere modi maiores?
        </p>
        <div className={classes.btn}>
          <button>Send Request</button>
        </div>
      </li>
    </ul>
  );
}

export default AllUsers;
