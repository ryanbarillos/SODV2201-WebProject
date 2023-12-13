// Pages
import Home from "./pages/Home";
import SearchCourse from "./pages/SearchCourse";
import AddCourse from "./pages/AddCourse";
import StudentList from "./pages/StudentList";
import StudentForms from "./pages/StudentForms";
import RemoveCourse from "./pages/RemoveCourse";
import NotFound from "../../component/pages/NotFound";

// Javascript & React Components
import Navbar from "../../component/navbar/Navbar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar mode="admin" />}>
      <Route path="/" element={<Home />} />
      <Route path="/SearchCourse" element={<SearchCourse />} />
      <Route path="/AddCourse" element={<AddCourse />} />
      <Route path="/RemoveCourse" element={<RemoveCourse />} />
      <Route path="/StudentForms" element={<StudentForms />} />
      <Route path="/StudentList" element={<StudentList />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function AdminMain() {
  return (
    <div className="AdminMain">
      <RouterProvider router={router} />
    </div>
  );
}

export default AdminMain;
