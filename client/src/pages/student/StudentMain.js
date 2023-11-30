// CSS
// import "../allPages/styles/AllPages.css";
// import "../allPages/styles/Forms.css";

// Javascript & React Components
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyCourses from "./pages/MyCourses";
import CourseAdd from "./pages/AddCouses";
import Help from "../../component/pages/Help";
import NotFound from "../../component/pages/NotFound";

function StudentMain() {
  return (
    <div className="StudentMain">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/AddCourses" element={<CourseAdd />} />
          <Route path="/Help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default StudentMain;
