import { json } from "react-router";
import {useEffect,useContext} from 'react'
import AllUsers from "../components/AllUsers";
import { authCtx } from "../context/auth.context";
function HomePage() {
  const authContext = useContext(authCtx);
 
  useEffect(() => {
    async function auth() {
      const res = await fetch("http://localhost:3000/verifyToken", {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status == 403 || res.status == 401) {
        console.log("hello");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        authContext.setLogin(false);
        authContext.setToken(false);
      } else {
        const data = await res.json();
        authContext.setLogin(true);
        authContext.setName(data.name);
        authContext.setToken(data.token);
        authContext.setId(data.id);
      }
    }
    auth();
  });
  return (
    <div>
      <AllUsers></AllUsers>
    </div>
  );
}

export async function getAllUsers() {
  const token = localStorage.getItem("token");
  let response;
  if (token) {
    response = await fetch("http://localhost:3000/getAllUsers", {
      headers: {
        authorization: "bearer " + token,
      },
    });
  } else {
    response = await fetch("http://localhost:3000/getAllUsers");
  }

  if (!response.ok) {
    throw new Error("Failed To Fetch");
  }
  const users = await response.json();
  return json(users, { status: 200 });
}

export async function requestSend({ request, params }) {
  const formObj = await request.formData();
  const req = await fetch("http://localhost:3000/requests", {
    body: JSON.stringify({ id: formObj.get("id") }),
    method: request.method,
    headers: {
      "content-type": "application/json",
      authorization: "bearer " + localStorage.getItem("token"),
    },
  });

  if (req.status == 401 || req.status == 403) {
    return await req.json();
  } else {
    return await req.json();
  }
}

export default HomePage;
