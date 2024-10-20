import { useContext, useEffect,useState } from "react";
import Nav from "../components/util/nav";
import  { authCtx  } from "../context/auth.context";
import HomePage, { getAllUsers, requestSend } from "../pages/HomePage";
import LoginPage, { loginAction } from "../pages/LoginPage";
import SignupPage, { SignupAction } from "../pages/SignupPage";
import "./App.css";
import MessageRequest, { getAllReqForUser } from "../pages/MessageRequest";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "../pages/Chat";



function App() {
  // const authContext = useContext(authCtx)
  // useEffect(()=> {
  //   async function auth() {
  //     const res = await fetch("http://localhost:3000/verifyToken", {
  //       headers: {
  //         authorization: `bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     if (res.status == 403 || res.status == 401) {
  //       console.log("hello");
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("id");
  //       authContext.setLogin(false);
  //       authContext.setToken(false);
  //     } else {
  //       const data = await res.json();
  //       authContext.setLogin(true);
  //       authContext.setName(data.name);
  //       authContext.setToken(data.token);
  //       authContext.setId(data.id);
  //     }
  //   }
  //   auth()
  // },[])
  const route = createBrowserRouter([
    //with createBrowserRouter,Defined routes to render different pages for different routes in Single Page Applications
    {
      path: "/",
      element: <Nav></Nav>,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: getAllUsers,
        },
        {
          path: "login",
          element: <LoginPage></LoginPage>,
          action: loginAction,
        },
        {
          path: "signup",
          element: <SignupPage></SignupPage>,
          action: SignupAction,
        },
        {
          path: "messagerequest",
          element: <MessageRequest></MessageRequest>,
          loader:getAllReqForUser
        },

        {
          path: "chat",
          element: <Chat></Chat>
        },
      ],
    },
    {
      path: "/request",
      action: requestSend,
    },
  ]);
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
