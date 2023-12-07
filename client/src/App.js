/*
  SODV2201, Assignment 01

  By Group 3
    Ryan Barillos
    Gurleen Kaur
*/

// CSS
import "./component/styles/Sitewide.css";
import "./component/styles/Forms.css";

// Javascript & React Components
import { useEffect, useState, useRef } from "react";
import { createBrowserRouter, Routes, Route, redirect } from "react-router-dom";
import AdminMain from "./pages/admin/AdminMain";
import StudentMain from "./pages/student/StudentMain";
import Navbar from "./component/navbar/Navbar";

function App() {
  // Variables
  const router = createBrowserRouter,
    [userMode, userModeSet] = useState("login"),
    [email, setEmail] = useState(""),
    [pass, setPass] = useState(""),
    [auth, setAuth] = useState(false);

  return (
    <div>
      <Navbar mode="login" />
    </div>
  );
}

export default App;
