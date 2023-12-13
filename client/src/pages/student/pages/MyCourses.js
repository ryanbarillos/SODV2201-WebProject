import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";
import useAuthContext from "../../../hooks/useAuthContext";

function MyCourses() {
  const [termNow, termNowSet] = useState(1),
    [termNext, termNextSet] = useState(termNow === 4 ? 0 : termNow + 1),
    [courses, setCourses] = useState(null),
    [subtitle, setSubtitle] = useState(""),
    user = useAuthContext().user;

  // Get courses
  useEffect(() => {
    const courseList = async (user) => {
      const email = user.email;
      try {
        const response = await fetch(`/api/course/mine/${email}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }).then((res) => {
          return res.json();
        });
        if (response) {
          if (response.length > 0) {
            setCourses(response);
            setSubtitle(`Enrolled for Term ${termNow}`);
          } else {
            setSubtitle(`Zero courses? Enroll now!`);
          }
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
      <h1>My Courses</h1>
      <h2>{subtitle}</h2>
      {courses && <CourseList courses={courses} term={termNow} mode={"show"} />}
    </div>
  );
}

export default MyCourses;
