/*
  SODV2201, Assignment 01

  By Group 3
    Ryan Barillos
    Gurleen Kaur
    David Yusty
*/

// CSS
import "./App.css";
import "./allPages/styles/AllPages.css";
import "./allPages/styles/Navbar.css";
import "./allPages/styles/Forms.css";

// Javascript & React Components
import Logo from "./allPages/assets/bvcLogo.svg";
import { useEffect, useState } from "react";
import AdminMain from "./bvcAdmin/AdminMain";
import StudentMain from "./bvcStudent/StudentMain";

function App() {
  const [loginMode, setLoginMode] = useState(""),
    [userData, setUserData] = useState("");

  const changeloginMode = (loginAs) => {
    setLoginMode(loginAs);
  };

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  });

  switch (loginMode) {
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
          <header className="navbar">
            <div className="leftSide">
              <img src={Logo} />
              <h1>Log In</h1>
            </div>
          </header>

          <div className="LogIn">
            <h1>Student Log In</h1>
            <form onSubmit={() => changeloginMode("student")}>
              <label>Email (Required)</label>
              <input type="text" required></input>
              <label>Password (Required)</label>
              <input type="text" required></input>
              <button onChange={() => changeloginMode("student")}>Done</button>
            </form>
          </div>

          <div className="special">
            <button onClick={() => changeloginMode("admin")}>
              Log in as Admin
            </button>
          </div>
        </div>
      );
  }
}

export default App;
