import Nav from "../components/util/nav";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const route = createBrowserRouter([
    //with createBrowserRouter,Defined routes to render different pages for different routes in Single Page Applications
    {
      path: "/",
      element:<Nav></Nav>,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage></LoginPage>,
        },
        {
          path: "signup",
          element: <SignupPage></SignupPage>,
        },
      ],
    },
  ]);
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
