/*
  REFRENCE(s) on React Routers
  https://www.youtube.com/watch?v=OMQ2QARHPo0&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf
*/

import "./Navbar.css";
import React from "react";
import Logo from "./bvc.svg";
import { NavLink, Outlet } from "react-router-dom";

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
    case "auth":
      mode = "Authenticate";
      sideRight = (
        <div className="rightSide">
          <NavLink to="login">Login</NavLink>
          <NavLink to="signup">Sign-up</NavLink>
          {/* <NavLink to="Help">Get Help</NavLink> */}
        </div>
      );
      break;
    case "student":
      mode = "Student Mode";
      sideRight = (
        <div className="rightSide">
          <NavLink to="MyCourses">My Courses</NavLink>
          <NavLink to="AddCourses">Add Course</NavLink>
          <NavLink to="Help">Get Help</NavLink>
        </div>
      );
      break;
    case "admin":
      mode = "Admin Mode";
      sideRight = (
        <div className="rightSide">
          {/* <NavLink to="Home">Home</NavLink> */}
          <NavLink to="FindCourse">Find Course</NavLink>
          <NavLink to="AddCourse">Add Course</NavLink>
          <NavLink to="RemoveCourse">Remove Course</NavLink>
          <NavLink to="StudentList">Student List</NavLink>
          <NavLink to="StudentForms">Student Forms</NavLink>
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
    <div>
      <header>
        <nav className="navbar">
          {sideLeft}
          {sideRight}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Navbar;
