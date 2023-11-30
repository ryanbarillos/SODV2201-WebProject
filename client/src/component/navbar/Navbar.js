import "./Navbar.css";
import React from "react";
import Logo from "./bvc.svg";
import { Link } from "react-router-dom";

function Navbar(props) {
  let mode = "";

  switch (props.mode) {
    case "login":
      mode = "Log In";
      break;
    case "register":
      mode = "Register";
      break;
    case "student":
      mode = "Student Mode";
    case "admin":
      mode = "Admin Mode";
      break;
  }

  const sideLeft = (
      <div className="leftSide">
        <img src={Logo} />
        <h1>{mode}</h1>
      </div>
    ),
    sideRight = (
      <div className="rightSide">
        {/* <Link to="Home">Home</Link> */}
        <Link to="SearchCourse">Search Course</Link>
        <Link to="AddCourse">Add Course</Link>
        <Link to="RemoveCourse">Remove Course</Link>
        <Link to="StudentList">Student List</Link>
        <Link to="StudentForms">Student Forms</Link>
      </div>
    );
  return <div className="navbar">{sideLeft}</div>;
}

export default Navbar;
