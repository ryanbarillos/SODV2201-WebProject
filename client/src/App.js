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
import AdminMain from "./pages/admin/AdminMain";
import StudentMain from "./pages/student/StudentMain";
import Navbar from "./component/navbar/Navbar";

function App() {
  // Variables
  const [userMode, userModeSet] = useState("logIn"),
    [email, setEmail] = useState(""),
    [pass, setPass] = useState("");

  //Functions
  const handleUser = (event) => {
      let key = event.target.value;
      setEmail(key);
    },
    handlePass = (event) => {
      let key = event.target.value;
      setPass(key);
    },
    handleLogin = (email, password) => {
      alert(email + "\n" + password);
    },
    ModeSet = (loginAs) => {
      userModeSet(loginAs);
    };

  //Authentication Page
  switch (userMode) {
    /*
      Login Student
    */
    case "student":
      return <StudentMain />;
    /*
      Login Admin
    */
    case "admin":
      return <AdminMain />;
    /*
      Login Page
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
          <div className="LogIn">
            <h1>Student Log In</h1>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleLogin(email, pass);
              }}
            >
              <label>Email (Required)</label>
              <input type="text" required onChange={handleUser}></input>
              <label>Password (Required)</label>
              <input type="text" required onChange={handlePass}></input>
              <button id="left">Log In</button>
              <button id="right">Sign Up</button>
            </form>
          </div>
          <div className="special">
            <button onClick={() => ModeSet("admin")}>Log in as Admin</button>
          </div>
        </div>
      );
  }
}

export default App;
