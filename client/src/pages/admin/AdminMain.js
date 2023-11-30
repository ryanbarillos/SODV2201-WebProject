import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import AdminLogin from "./pages/Login";
import Home from "./pages/Home";
import SearchCourse from "./pages/SearchCourse";
import AddCourse from "./pages/AddCourse";
import StudentList from "./pages/StudentList";
import StudentForms from "./pages/StudentForms";
import RemoveCourse from "./pages/RemoveCourse";
import PageNotFound from "./pages/PageNotFound";

function AdminMain() {
  return (
    <div className="AdminMain">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SearchCourse" element={<SearchCourse />} />
          <Route path="/AddCourse" element={<AddCourse />} />
          <Route path="/RemoveCourse" element={<RemoveCourse />} />
          <Route path="/StudentForms" element={<StudentForms />} />
          <Route path="/StudentList" element={<StudentList />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AdminMain;
