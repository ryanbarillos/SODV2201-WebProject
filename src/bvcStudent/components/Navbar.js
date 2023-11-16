// CSS
import "../../allPages/styles/Navbar.css";
import Logo from "../../allPages/assets/bvcLogo.svg";

// Javascript & React Components
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} />
        <h1>Student Mode</h1>
      </div>
      <div className="rightSide">
        {/* <Link to="Home">Home</Link> */}
        <Link to="MyCourses">My Courses</Link>
        <Link to="CourseAdd">Add Course</Link>
        <Link to="CourseRemove">Remove Course</Link>
        <Link to="GetHelp">Get Help</Link>
      </div>
    </div>
  );
}

export default Navbar;
