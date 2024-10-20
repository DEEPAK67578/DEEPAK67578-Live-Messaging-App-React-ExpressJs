import { useContext, useState, useEffect, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import ChatBox from "../components/chatComponents/ChatBox";
import Conversation from "../components/chatComponents/Conversation";
import { authCtx } from "../context/auth.context";
function Chat() {
  const ctx = useContext(authCtx);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieverMessage, setRecieverMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", ctx.id);
    socket.current.on("get-users", (users) => {
      setOnlineUser(users);
      console.log(users);
    });
  }, [ctx.id]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieverMessage(data);
    });
  });
  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await fetch(`http://localhost:3000/chat/${ctx.id}`);
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, [ctx.id]);

  const checkOnlineStatus = (chat)=> {
    console.log(chat)
    const chatMembers = chat.member.find((member)=> member !== ctx.id)
    const online = onlineUser.find((user)=> user.userId === chatMembers)
    return online ? true:false
  }

  return (
    <div className="Chat">
      {/* Left */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat, idx) => {
              return (
                <div onClick={() => setCurrentChat(chat)} key={idx}>
                  <Conversation online={checkOnlineStatus(chat)} data={chat} currentUser={ctx.id}></Conversation>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="Right-side-chat">
        <div style={{}}></div>

        <ChatBox
          recieverMessage={recieverMessage}
          sendMessage={sendMessage}
          setSendMessage={setSendMessage}
          chat={currentChat}
          currentUser={ctx.id}
        ></ChatBox>
      </div>
    </div>
  );
}

export default Chat;
