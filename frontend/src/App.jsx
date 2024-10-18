import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const route = createBrowserRouter([
    //with createBrowserRouter,Defined routes to render different pages for different routes in Single Page Applications
    {
      path: "/",
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage></LoginPage>,
        },
      ],
    },
  ]);
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
