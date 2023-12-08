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

  //Functions
  const handleSubmit = async (event) => {
      event.preventDefault();
      setAuth(true);

      fetch(`/api/student/${email}/${pass}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          userModeSet(
            data.studentEmail === email && data.studentPasswd === pass
              ? "student"
              : "login"
          );
          alert("User Authenticated");
        });
      /*
      Connect to SQL Server API to see if user exists
    */
    },
    ModeSet = (loginAs) => {
      userModeSet(loginAs);
    };

  //Authentication Page
  switch (userMode) {
    /*
      login Student
    */
    case "student":
      return <StudentMain />;
    /*
      login Admin
    */
    case "admin":
      return <AdminMain />;
    /*
      login Page
    */
    default:
      return (
        <div>
          {/*  */}
          {/* Navbar */}
          {/*  */}
          <Navbar mode="login" />
          {/*  */}
          {/* Log In form */}
          {/*  */}
          <div className="login">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
              <label>Email (Required)</label>
              <input
                type="text"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
              ></input>
              <label>Password (Required)</label>
              <input
                type="password"
                id="pass"
                onChange={(event) => setPass(event.target.value)}
                value={pass}
                required
              ></input>
              <button id="left">Log In</button>
              <button id="right">Sign Up</button>
            </form>
          </div>
        </div>
      );
  }
}

export default App;
