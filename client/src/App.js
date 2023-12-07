/*
  SODV2201, Assignment 01

  By Group 3
    Ryan Barillos
    Gurleen Kaur
*/

// CSS
import "./component/styles/Sitewide.css";
// import "./component/styles/Forms.css";

// Javascript & React Components
import { useEffect, useState, useRef } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  useNavigate,
  redirect,
} from "react-router-dom";
import AdminMain from "./pages/admin/AdminMain";
import StudentMain from "./pages/student/StudentMain";
import Navbar from "./component/navbar/Navbar";
import { Login } from "./pages/authentication/Login";
import { Signup } from "./pages/authentication/Signup";

function App() {
  // Variables
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar mode={"auth"} />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
