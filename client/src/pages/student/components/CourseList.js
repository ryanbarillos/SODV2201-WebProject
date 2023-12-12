import useAuthContext from "../../../hooks/useAuthContext";

import { useState } from "react";
const CourseList = ({ courses, term }) => {
  const user = useAuthContext().user,
    [list, setList] = useState(courses.filter((c) => c.CourseTerm === term)),
    lsUpdate = (index) => {
      alert("You've enrolled in this course!");
      setList(list.filter((c) => c.CourseID !== index));
    };
  return (
    <div>
      <h1>You are in Term {term}</h1>
      <h2>Select Your Course(s)</h2>
      {list.map((c) => (
        // Render each course into individual sections
        <div className="courseList">
          <h2 style={{ textAlign: "left", color: "hsla(335, 100%, 40%, 1)" }}>
            {c.CourseName}
            <span style={{ float: "right", color: "black" }}>
              {c.CourseCode}
            </span>
          </h2>
          <button onClick={() => lsUpdate(c.CourseID)}>Add Course</button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
