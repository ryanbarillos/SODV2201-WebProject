/*
  SODV2201, Assignment 01

  By Group 3
    Ryan Barillos
    Gurleen Kaur
*/

// CSS
// import "./allPages/styles/AllPages.css";
// import "./allPages/styles/Navbar.css";
// import "./allPages/styles/Forms.css";

// Javascript & React Components
import { useEffect, useState } from "react";
import AdminMain from "./pages/admin/AdminMain";
import StudentMain from "./pages/student/StudentMain";
import Navbar from "./component/navbar/Navbar";

function App() {
  const [userMode, userModeSet] = useState(""),
    [userData, setUserData] = useState("");

  const changeloginMode = (loginAs) => {
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
          {/* <header className="navbar">
            <div className="leftSide">
              <img src={Logo} />
              <h1>Log In</h1>
            </div>
          </header> */}
          <Navbar mode="login" />

          <div className="LogIn">
            <h1>Student Log In</h1>
            <form onSubmit={() => changeloginMode("student")}>
              <label>Email (Required)</label>
              <input type="text" required></input>
              <label>Password (Required)</label>
              <input type="text" required></input>
              <button id="logIn" onChange={() => changeloginMode("student")}>
                Log In
              </button>
              <button>Sign Up</button>
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
