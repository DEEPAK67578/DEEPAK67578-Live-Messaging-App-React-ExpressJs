import React from 'react'
import Login from '../components/login'
import { useActionData } from 'react-router'
import { redirect } from 'react-router'

function LoginPage() {
  return (
    <div>
      <Login></Login>
    </div>
  )
}

export async function loginAction({request}) {
  const formData = await request.formData()
  const cred = {
   email:formData.get("email"),
   password:formData.get("password")
  }
  
  const res = await fetch("http://localhost:3000/login",{
    method:request.method,
    body:JSON.stringify(cred),
    headers:{
      "content-type":"application/json"
    }
  })

  if(res.status == 403 || res.status == 401) {
    return await res.json()
  } else {
    const data = await res.json()
    localStorage.setItem('token',data.token)
    localStorage.setItem('id',data.userId)
    return redirect("/")
  }
}

export default LoginPage