import "./Navbar.css";
import React from "react";
import Logo from "./bvc.svg";
import { Link } from "react-router-dom";

function Navbar(props) {
  // User mode
  let mode = "",
    // Navbar Buttons
    sideRight = "";

  /*
    Change mode and buttons of navbar based on login state
    .
    Login & Register have no buttons
    Students & Admins will each have its own set of links
  */
  switch (props.mode) {
    case "login":
      mode = "Log In";
      break;
    case "register":
      mode = "Register";
      break;
    case "student":
      mode = "Student Mode";
      sideRight = (
        <div className="rightSide">
          <Link to="MyCourses">My Courses</Link>
          <Link to="AddCourses">Add Course</Link>
          <Link to="Help">Get Help</Link>
        </div>
      );
      break;
    case "admin":
      mode = "Admin Mode";
      sideRight = (
        <div className="rightSide">
          {/* <Link to="Home">Home</Link> */}
          <Link to="FindCourse">Find Course</Link>
          <Link to="AddCourse">Add Course</Link>
          <Link to="RemoveCourse">Remove Course</Link>
          <Link to="StudentList">Student List</Link>
          <Link to="StudentForms">Student Forms</Link>
        </div>
      );
      break;
  }

  // Navbar School Logo
  const sideLeft = (
    <div className="leftSide">
      <img src={Logo} />
      <h1>{mode}</h1>
    </div>
  );

  return (
    <div className="navbar">
      {sideLeft}
      {sideRight}
    </div>
  );
}

export default Navbar;
