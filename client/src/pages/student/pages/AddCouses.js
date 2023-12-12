import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";
import useAuthContext from "../../../hooks/useAuthContext";

function AddCourses() {
  const [termNow, termNowSet] = useState(1),
    [termNext, termNextSet] = useState(termNow === 4 ? 0 : termNow + 1),
    [courses, setCourses] = useState(null),
    user = useAuthContext().user;

  // Get courses
  useEffect(() => {
    if (user) {
      fetch("/api/course/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCourses(data);
        });
    }
  }, []);

  return (
    <div>{courses && <CourseList courses={courses} term={termNow} />}</div>
  );
}

export default AddCourses;
