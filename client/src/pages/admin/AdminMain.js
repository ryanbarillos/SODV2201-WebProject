// Pages
import Home from "./pages/Home";
import AddCourse from "./pages/AddCourse";
import StudentList from "./pages/StudentList";
import StudentForms from "./pages/StudentForms";
import EditCourse from "./pages/EditCourse";
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
    <Route element={<Navbar mode="admin" />}>
      <Route path="/" element={<Home />} />
      <Route path="/AddCourse" element={<AddCourse />} />
      <Route path="/EditCourse" element={<EditCourse />} />
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
