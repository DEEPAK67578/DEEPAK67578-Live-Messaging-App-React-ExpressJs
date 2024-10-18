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
    const response = await fetch("http://localhost:3000/getAllUsers",{
      headers:{
        authorization:"bearer " + localStorage.getItem("token")
      }
    })
    if(!response.ok) {
      throw new Error("Failed To Fetch")
    }
    const users = await response.json()
    return json(users,{status:200})
}

export default HomePage
