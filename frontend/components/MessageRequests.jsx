import { useEffect, useState } from "react";
import classes from "./MessageRequests.module.css";

import { useLoaderData, useNavigate } from "react-router";
function MessageRequests() {
  const navigate = useNavigate()
  const [sendingReq, setSendingReq] = useState(false);
  const [choice, setChoice] = useState(null);
  const [err, setErr] = useState(null);
  const loaderData = useLoaderData();
  async function reqHandler(handler, eve) {
    setChoice(handler);
    setSendingReq(true);
    const res = await fetch("http://localhost:3000/accrejreq", {
      method: "POST",
      body:JSON.stringify({handler:handler,ReqSenderId:eve.target.value,ReqAcceptId:localStorage.getItem("id")}),
      headers:{
        "content-type":"application/json",
        "Authorization":"bearer " + localStorage.getItem("token")
      },
    });

    if(res.status == 403 || res.status == 400) {
      const err = await res.json()
      setErr(err)
    }

    if(res.status == 200) {
      const suc = await res.json()
      setErr(suc)
    }

    setChoice(null)
    setSendingReq(false)
    navigate("/chat")
  }

  useEffect(()=> {
      setTimeout(()=> {
        setErr(null)
      },4000)
  },[err])

 
  console.log(loaderData)
  return (
    <div>
      {err && <p>{err}</p>}
      {loaderData && loaderData?.requests?.length == 0 && <p className={classes.notfound}>No Message Requests Found...</p>}
      {loaderData?.requests?.length > 0 && <ul className={classes.requests}>
        {loaderData.requests.map((val, idx) => {
          return (
            <>
              <li key={idx}>
                {console.log(val)}
                <div>
                  <h1>
                    {val.user.name}({val.user.email})
                  </h1>
                  <p>{val.user.description}</p>
                </div>
                <div className={classes.btnAccRej}>
                  <button
                    type="button"
                    value={val.user._id}
                    onClick={reqHandler.bind(null, "accept")}
                    disabled={sendingReq}
                    className={classes.btn}
                  >
                    {choice == "accept" ? "Accepting..." : "Accept"}
                  </button>
                  <button
                    value={val.user._id}
                    type="button"
                    onClick={reqHandler.bind(null, "reject")}
                    disabled={sendingReq}
                    className={classes.alt}
                  >
                    {choice == "reject" ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </li>
            </>
          );
        })}
      </ul>}
    </div>
  );
}

export default MessageRequests;
