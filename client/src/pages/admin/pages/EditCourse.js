import React, { useEffect, useState } from "react";
import CourseList from "../../../components/courselist/CourseList";
import useAuthContext from "../../../hooks/useAuthContext";

function EditCourses() {
  const user = useAuthContext().user,
    [courses, setCourses] = useState(null);
  // Get courses
  useEffect(() => {
    const courseList = async (user) => {
      try {
        const response = await fetch("/api/course/all/", {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }).then((res) => {
          return res.json();
        });
        if (response) {
          setCourses(response);
        }
      } catch (err) {
        console.log("Error\n" + err.message);
      }
    };
    if (user) {
      courseList(user);
    }
  }, [user]);

  return (
    <div>
      <h1>Edit Courses</h1>
      <h2>Update or Delete Any Course</h2>
      {courses && <CourseList courses={courses} term={null} mode={"edit"} />}
    </div>
  );
}

export default EditCourses;
