/*
  SODV2201, Assignment 01

  By Group 3
    Ryan Barillos
    Gurleen Kaur
*/

// CSS
import "./component/styles/Sitewide.css";
// import "./component/styles/Forms.css";

// Javascript & React Components
// import { useEffect, useState, useRef } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  useNavigate,
  redirect,
} from "react-router-dom";
import AdminMain from "./pages/admin/AdminMain";
import StudentMain from "./pages/student/StudentMain";
import NotFound from "./component/pages/NotFound";
import Navbar from "./component/navbar/Navbar";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import useAuthContext from "./hooks/useAuthContext";

export function App() {
  // Variables
  const user = useAuthContext().user;
  let mode = user === null || undefined ? "auth" : user.type;
  // console.log(mode);
  // let mode = "stdnt";
  // let mode = userType === null ? "auth" : userType;

  // V6 and newer
  const auth = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar mode={mode} />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="studentMain" element={<StudentMain />} /> */}
      </Route>
    )
  );

  switch (mode) {
    case "auth":
      return (
        <div>
          <RouterProvider router={auth} />
        </div>
      );
    case "stdnt":
      return (
        <div>
          <StudentMain />
        </div>
      );
    case "admin":
      return (
        <div>
          <AdminMain />
        </div>
      );
  }
}

export default App;
