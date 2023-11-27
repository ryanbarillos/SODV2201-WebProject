import "../../allPages/styles/Navbar.css";
import React from "react";
import Logo from "../assets/bvcLogo.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} />
        <h1>Admin Mode</h1>
      </div>
      <div className="rightSide">
        {/* <Link to="Home">Home</Link> */}
        <Link to="SearchCourse">Search Course</Link>
        <Link to="AddCourse">Add Course</Link>
        <Link to="RemoveCourse">Remove Course</Link>
        <Link to="StudentList">Student List</Link>
        <Link to="StudentForms">Student Forms</Link>
      </div>
    </div>
  );
}

export default Navbar;
