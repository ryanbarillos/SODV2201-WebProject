import React, { useEffect, useState } from "react";
import CourseList from "../../../components/courselist/CourseList";
import useAuthContext from "../../../hooks/useAuthContext";

function AddCourses() {
  const user = useAuthContext().user,
    [termNow, termNowSet] = useState(1),
    [courses, setCourses] = useState(null);

  // Get courses
  useEffect(() => {
    const courseList = async (user) => {
      const email = user.email;
      try {
        const response = await fetch(`/api/course/all/${email}`, {
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
      <h1>You are in Term {termNow}</h1>
      <h2>Select Your Course(s)</h2>
      {courses && (
        <CourseList courses={courses} term={termNow} mode={"enroll"} />
      )}
    </div>
  );
}

export default AddCourses;
