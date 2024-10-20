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
  authContext.login && allUsers.filteredReq.forEach((req) => {
    allUsers.filteredUsers.forEach((val, idx) => {
      if (req.to == val._id) {
        allUsers.filteredUsers[idx].requestState = req.requestState;
      }
    });
  });

  console.log(allUsers.filteredUsers, allUsers.filteredReq);

  useEffect(() => {
    setSendInfo(true);
    const timerId = setTimeout(() => {
      setSendInfo(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [state]);

  return (
    <>
      {data && data.length > 0 && sendInfo && (
        <p className={classes.information}>{data}</p>
      )}
      <ul className={classes.users}>
        {allUsers.filteredUsers.length == 0 && <p>No Users Found</p>}
        {allUsers.filteredUsers.map((val, idx) => {
          return (
            <li key={idx}>
              <div className={classes.usersImage}>
                <img src={"http://localhost:3000/" + val.imgPath}></img>
              </div>
              <div className={classes.info}>
                <h1>{val.name}</h1>
                <p className={classes.description}>{val.description}</p>
                <div className={classes.btn}>
                  {authContext.login && (
                    <Form method="POST" action="/request">
                      {state == "idle" && (
                        <input type="hidden" name="id" value={val._id}></input>
                      )}
                      {state == "idle" && val.requestState && (
                        <button disabled={true} style={{backgroundColor:`${val.requestState == "accept" ? "green" : "gray"}`}}>{val.requestState == "accept" ? "Accepted" : "Pending"} </button>
                      )}
                      {state == "idle" && !val.requestState && (
                        <button>Send Request</button>
                      )}
                      {state == "submitting" && (
                        <button>Sending Request...</button>
                      )}
                    </Form>
                  )}
                  {!authContext.login && <p>Login to Request</p>}
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
