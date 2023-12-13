import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";
import useAuthContext from "../../../hooks/useAuthContext";

function MyCourses() {
  const [termNow, termNowSet] = useState(1),
    [termNext, termNextSet] = useState(termNow === 4 ? 0 : termNow + 1),
    [courses, setCourses] = useState(null),
    user = useAuthContext().user;

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

  console.log(courses);
  return (
    <div>
      {" "}
      <h1>My Courses</h1>
      <h2>Enrolled for Term {termNow}</h2>
      {courses && <CourseList courses={courses} term={termNow} mode={"show"} />}
    </div>
  );
}

export default MyCourses;
