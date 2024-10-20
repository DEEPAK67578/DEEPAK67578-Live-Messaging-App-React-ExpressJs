import { json } from "react-router"
import MessageRequests from "../components/MessageRequests"

function MessageRequest() {
  return (
    <div>
      <MessageRequests></MessageRequests>
    </div>
  )
}

export default MessageRequest

export const getAllReqForUser = async ({request,params})=> {
    const res =  await fetch("http://localhost:3000/getAllReq/",{
        headers:{
            "Authorization":`bearer ${localStorage.getItem("token")}`
        }
    })
    if(res.status == 403 || res.status == 401) {
        return res.json("Not Authenticated")
    } else {
        return await res.json()
    }
}