import { json } from 'react-router'
import AllUsers from '../components/AllUsers'
function HomePage() {
  return (
    <div>
      <AllUsers></AllUsers>
    </div>
  )
}

export async function getAllUsers() {
    const token = localStorage.getItem("token")
    let response;
    if(token) {
      response = await fetch("http://localhost:3000/getAllUsers",{
        headers:{
          authorization:"bearer " +  token
        }
      })
    } else {
      response = await fetch("http://localhost:3000/getAllUsers")
    }
    
    if(!response.ok) {
      throw new Error("Failed To Fetch")
    }
    const users = await response.json()
    return json(users,{status:200})
}

export async function requestSend({request,params}) {
  const formObj = await request.formData()
    const req = await fetch("http://localhost:3000/requests",{
      body:JSON.stringify({id:formObj.get("id")}),
      method:request.method,
      headers:{
        'content-type':"application/json",
        authorization:"bearer " + localStorage.getItem('token')
      }
    })

    if(req.status == 401 || req.status == 403) {
      return await req.json()
    } else {
      return await req.json()
    }
    
}

export default HomePage
