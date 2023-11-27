import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";

function CourseAdd() {
  const [termNow, termNowSet] = useState(1),
    [termNext, termNextSet] = useState(termNow === 4 ? 0 : termNow + 1),
    [courses, setCourses] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/courses")
      .then((res) => {
        return res.json();
      })
      .then((data) => setCourses(data));
  });

  return (
    <div>
      <h1>You are in Term {termNow}</h1>
      <h2>Select Your Courses</h2>
      {courses && <CourseList courses={courses} term={termNow} />}
    </div>
  );
}

export default CourseAdd;
