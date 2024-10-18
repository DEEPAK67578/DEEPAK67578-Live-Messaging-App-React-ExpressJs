import { useLoaderData } from "react-router";
import classes from "./AllUsers.module.css";
function AllUsers() {
  const allUsers = useLoaderData();
  return (
    <ul className={classes.users}>
      {allUsers.length == 0 && <p>No Users Found</p>}
      {allUsers.map((val, idx) => {
        return (
          <li key={idx}>
            <div className={classes.usersImage}>
              <img src={"http://localhost:3000/" + val.imgPath}></img>
            </div>
            <div className={classes.info}>
              <h1>{val.name}</h1>
              <p className={classes.description}>{val.description}</p>
              <div className={classes.btn}>
                <button>Send Request</button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default AllUsers;
