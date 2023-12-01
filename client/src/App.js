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
import { useEffect, useState } from "react";
import AdminMain from "./pages/admin/AdminMain";
import StudentMain from "./pages/student/StudentMain";
import Navbar from "./component/navbar/Navbar";

function App() {
  const [userMode, userModeSet] = useState("logIn"),
    [userData, setUserData] = useState(null);

  const ModeSet = (loginAs) => {
    userModeSet(loginAs);
  };

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
          {/* Navbar */}
          <Navbar mode="login" />
          {/* Log In form */}
          <div className="LogIn">
            <h1>Student Log In</h1>
            <form onSubmit={() => ModeSet("student")}>
              <label>Email (Required)</label>
              <input type="text" required></input>
              <label>Password (Required)</label>
              <input type="text" required></input>
              <button id="left" onChange={() => ModeSet("student")}>
                Log In
              </button>
              <button id="right" onChange={() => ModeSet("signup")}>
                Sign Up
              </button>
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
