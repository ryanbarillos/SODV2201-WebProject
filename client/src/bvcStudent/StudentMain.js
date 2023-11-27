// CSS
import "../allPages/styles/AllPages.css";
import "../allPages/styles/Forms.css";

// Javascript & React Components
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyCourses from "./pages/MyCourses";
import CourseAdd from "./pages/CourseAdd";
import CourseRemove from "./pages/CourseRemove";
import GetHelp from "../allPages/pages/GetHelp";
import PageNotFound from "../allPages/pages/PageNotFound";

function StudentMain() {
  return (
    <div className="StudentMain">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/CourseAdd" element={<CourseAdd />} />
          <Route path="/CourseRemove" element={<CourseRemove />} />
          <Route path="/GetHelp" element={<GetHelp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default StudentMain;
