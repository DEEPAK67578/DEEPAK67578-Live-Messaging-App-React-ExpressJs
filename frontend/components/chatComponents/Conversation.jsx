import React, { useEffect, useState } from "react";
import classes from './Conversation.module.css'
function Conversation({ data, currentUser,online }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.member.find((id) => id != currentUser);
    console.log(userId)
    async function getUserData() {
      try {
        const res = await fetch("http://localhost:3000/getuser/" + userId);
        const userData1 = await res.json();
        setUserData(userData1);
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
      <div className={classes.convo}>
       {online &&  <div className="online-dot"></div>}
        <img
          className="followerImage"
          style={{ width: "50px", height: "50px" }}
          src={`http://localhost:3000/${userData?.imgPath}`}
        ></img>
        <div className="name" style={{ fontSize: "0.8rem" }}>
          <span>{userData?.name}</span>
          {online ? <span>Online</span> : <span>Offline</span>}
        </div>
      </div>
    </div>
    <hr style={{width:"85%",border:'0.1px solid #ecececl'}}/>
    </>
  );
}

export default Conversation;
