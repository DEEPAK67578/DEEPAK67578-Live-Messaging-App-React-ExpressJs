import { useEffect, useState,useRef } from "react";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
function chatMain({ chat, currentUser,setSendMessage ,recieverMessage}) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scoll = useRef()
  //Always Scroll to Last
  useEffect(()=> {
    scoll.current?.scrollIntoView({behavior:"smooth"})
  })
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch("http://localhost:3000/message/" + chat._id);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) fetchMessage();
  }, [chat, currentUser]);

  useEffect(()=> {
    console.log(recieverMessage)
     if(recieverMessage !== null && recieverMessage.chatId === chat._id) {
      setMessages([...messages,recieverMessage])
     }
  },[recieverMessage?.chatId,recieverMessage])

  useEffect(() => {
    console.log(chat)
    const userId = chat?.member?.find((id) => id != currentUser);
    async function getUserData() {
      try {
        const res = await fetch("http://localhost:3000/getuser/" + userId);
        const userData1 = await res.json();
        setUserData(userData1);
      } catch (err) {
        console.log(err);
      }
    }
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e)=> {
    e.preventDefault();
    const message = {
      senderId:currentUser,
      chatId:chat._id,
      text:newMessage,
    }

    try {
      const res = await fetch("http://localhost:3000/message",{
        method:"POST",
        body:JSON.stringify(message),
        headers:{
          "content-type":"application/json"
        }
      })
      
      const data = await res.json()
      console.log(data)
      setMessages([...messages,data])
      setNewMessage("")
    } catch(err) {
      console.log(err)
    }
  
    const recieverId = chat.member.find((id) => id != currentUser);
    setSendMessage({...message,recieverId})
  }
  return (
    <>
      <div className="ChatBox-container">
        {!chat && <span style={{color:"white",textAlign:"center",margin:"20px",fontSize:'20px'}}>Tap Chat to Start the Conversation</span>}
        {chat && (
          <>
            <div className="chat-header">
              <div className="follower">
                <div className="convo">
                  {userData && (
                    <img
                      className="followerImage"
                      style={{ width: "50px", height: "50px" }}
                      src={`http://localhost:3000/${userData?.imgPath}`}
                    ></img>
                  )}
                  <div className="name" style={{ fontSize: "1.4rem" }}>
                    <span>{userData?.name}</span>
                  </div>
                </div>
                <hr></hr>
              </div>
            </div>

            <div className="chat-body">
              {messages.map((message) => {
                return (
                  <>
                    <div
                    ref={scoll}
                      className={
                        message.senderId == currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message.text}</span>
                      <span>{format(message.createdAt)}</span>
                    </div>
                  </>
                );
              })}
            </div>

            <div>
              <div className="chat-sender">
                <InputEmoji
                  value={newMessage}
                  onChange={handleChange}
                ></InputEmoji>
                <div className="send-button button" onClick={handleSend}>Send</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default chatMain;
