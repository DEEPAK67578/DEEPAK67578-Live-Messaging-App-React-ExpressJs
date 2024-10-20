import { useContext, useEffect,useState } from "react";
import Nav from "../components/util/nav";
import { authCtx } from "../context/auth.context";
import HomePage, { getAllUsers, requestSend } from "../pages/HomePage";
import LoginPage, { loginAction } from "../pages/LoginPage";
import SignupPage, { SignupAction } from "../pages/SignupPage";
import "./App.css";
import MessageRequest, { getAllReqForUser } from "../pages/MessageRequest";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "../pages/Chat";


function App() {

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
