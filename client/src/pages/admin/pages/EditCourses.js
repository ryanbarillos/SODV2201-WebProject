import React, { useEffect, useState } from "react";
import CourseList from "../../../components/courselist/CourseList";
import useAuthContext from "../../../hooks/useAuthContext";

function EditCourses() {
  const user = useAuthContext().user,
    [termNow, termNowSet] = useState(1),
    // [termNext, termNextSet] = useState(termNow === 4 ? 0 : termNow + 1),
    [courses, setCourses] = useState(null);

  // Get courses
  useEffect(() => {
    const courseList = async (user) => {
      const email = user.email;
      try {
        const response = await fetch(`/api/course/all/`, {
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
      {" "}
      <h1>Edit Courses</h1>
      <h2>Update or Delete Any Course</h2>
      {courses && (
        <CourseList courses={courses} term={termNow} mode={"enroll"} />
      )}
    </div>
  );
}

export default EditCourses;
