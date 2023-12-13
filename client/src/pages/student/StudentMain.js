// CSS
// import "../allPages/styles/AllPages.css";
// import "../allPages/styles/Forms.css";

// Pages
import Navbar from "../../component/navbar/Navbar";
import Home from "./pages/Home";
import MyCourses from "./pages/MyCourses";
import AddCourses from "./pages/AddCouses";
import Help from "../../component/pages/Help";
import NotFound from "../../component/pages/NotFound";

// Javascript & React Components
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar mode="stdnt" />}>
      <Route index element={<Home />} />
      <Route path="/MyCourses" element={<MyCourses />} />
      <Route path="/AddCourses" element={<AddCourses />} />
      <Route path="/Help" element={<Help />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const StudentMain = () => {
  return (
    <div className="StudentMain">
      {/* {console.log("I'm a student")} */}
      <RouterProvider router={router} />
    </div>
  );
};

export default StudentMain;
