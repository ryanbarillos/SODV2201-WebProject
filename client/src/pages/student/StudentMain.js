// Pages
import Home from "./pages/Home";
import MyCourses from "./pages/MyCourses";
import AddCourses from "./pages/AddCouses";
import Help from "../../components/pages/Help";
import NotFound from "../../components/pages/NotFound";

// Javascript & React Components
import Navbar from "../../components/navbar/Navbar";
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
      {/* <Route path="/MyCourses" element={<MyCourses />} /> */}
      <Route path="/AddCourses" element={<AddCourses />} />
      <Route path="/Help" element={<Help />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const StudentMain = () => {
  return (
    <div className="StudentMain">
      <RouterProvider router={router} />
    </div>
  );
};

export default StudentMain;
