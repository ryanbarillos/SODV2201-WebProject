import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";

function AddCourses() {
  const [termNow, termNowSet] = useState(1),
    [termNext, termNextSet] = useState(termNow === 4 ? 0 : termNow + 1),
    [courses, setCourses] = useState(null);

  // Get courses
  useEffect(() => {
    fetch("/api/course/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCourses(data);
      });
  }, []);

  return (
    <div>
      <h1>You are in Term {termNow}</h1>
      <h2>Select Your Courses</h2>
      {courses && <CourseList courses={courses} term={termNow} />}
    </div>
  );
}

export default AddCourses;
