/*
  SODV2201, Assignment 01

  By Group 3
    Ryan Barillos
    Gurleen Kaur
*/

// CSS
import "./components/styles/Sitewide.css";
// import "./components/styles/Forms.css";

// Javascript & React Components
// import { useEffect, useState, useRef } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import AdminMain from "./pages/admin/AdminMain";
import StudentMain from "./pages/student/StudentMain";
import NotFound from "./components/pages/NotFound";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Home from "./pages/authentication/Home";
import useAuthContext from "./hooks/useAuthContext";

export function App() {
  // Variables
  const user = useAuthContext().user;
  // WIP : Make this a reactive variable
  // let mode = user === null || undefined ? "auth" : user.type;
  let mode = () => {
    const a = "auth";
    if (user === null || undefined) {
      return a;
    }
    else {
      switch (user.type) {
        case "stdnt":
          return user.type;
        case "admin":
          return user.type;
        default:
          return a;
      }
    }
  }
  // // console.log(mode);
  // let mode = "stdnt";
  // let mode = userType === null ? "auth" : userType;

  // V6 and newer
  const auth = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar mode={mode()} />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  switch (mode()) {
    case "stdnt":
      return (
        <div>
          <StudentMain />
        </div>
      );
    case "admin":
      return (
        <div>
          <AdminMain />
        </div>
      );
    default:
      return (
        <div>
          <RouterProvider router={auth} />
        </div>
      );
  }
}

export default App;
