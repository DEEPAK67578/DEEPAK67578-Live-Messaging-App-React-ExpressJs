import { useLoaderData } from "react-router";
import classes from "./AllUsers.module.css";
import { authCtx } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
function AllUsers() {
  let { Form, state, data } = useFetcher();
  const [sendInfo, setSendInfo] = useState(false);
  const allUsers = useLoaderData();
  const authContext = useContext(authCtx);

  useEffect(() => {
    setSendInfo(true);
    setTimeout(() => {
      setSendInfo(false);
    }, 3000);
  },[state]);

  return (
    <>
      {data && data.length > 0 && sendInfo && (
        <p className={classes.information}>{data}</p>
      )}
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
                  {authContext && (
                    <Form method="POST" action="/request">
                      {state == "idle" && (
                        <input type="hidden" name="id" value={val._id}></input>
                      )}
                      {state == "idle" && <button>Send Request</button>}
                      {state == "submitting" && (
                        <button>Sending Request...</button>
                      )}
                    </Form>
                  )}
                  {!authContext && <p>Login to Request</p>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AllUsers;
