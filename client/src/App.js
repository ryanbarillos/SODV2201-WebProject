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
  const handleSubmit = async (event) => {
      event.preventDefault();
      alert(email + "\n" + pass);

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
          <div className="special">
            <button onClick={() => ModeSet("admin")}>Log in as Admin</button>
          </div>
        </div>
      );
  }
}

export default App;
