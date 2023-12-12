import useAuthContext from "../../../hooks/useAuthContext";

import { useState } from "react";
const CourseList = ({ courses, term, mode }) => {
  const user = useAuthContext().user,
    [list, setList] = useState(courses.filter((c) => c.CourseTerm === term)),
    courseEnroll = (courseID) => {
      // Enroll student to course
      if (user) {
        fetch(`/api/course/enroll/${user.email}/${courseID}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            alert("You've enrolled in this course!");
          }
        });
        // Reflect changes on frontend
        setList(list.filter((c) => c.CourseID !== courseID));
      }
    };

  switch (mode) {
    case "enroll":
      return (
        <div>
          {list.map((c) => (
            // Render each course into individual sections
            <div className="courseList" key={c.CourseID}>
              <h2
                style={{ textAlign: "left", color: "hsla(335, 100%, 40%, 1)" }}
              >
                {c.CourseName}
                <span style={{ float: "right", color: "black" }}>
                  {c.CourseCode}
                </span>
              </h2>
              <button onClick={() => courseEnroll(c.CourseID)}>
                Add Course
              </button>
            </div>
          ))}
        </div>
      );
    case "show":
      return (
        <div>
          {list.map((c) => (
            // Render each course into individual sections
            <div className="courseList">
              <h2
                style={{ textAlign: "left", color: "hsla(335, 100%, 40%, 1)" }}
              >
                {c.CourseName}
                <span style={{ float: "right", color: "black" }}>
                  {c.CourseCode}
                </span>
              </h2>
              <button onClick={() => {}}>Withdraw</button>
            </div>
          ))}
        </div>
      );
  }
};

export default CourseList;
