// CSS
import "../styles/CourseList.css";

// Javascript & React Components
import React, { useState } from "react";

function MyCourses() {
  const [courseList, setCourseList] = useState([
    [
      { cName: "Project Management 1", cCode: "PRO111", id: 1 },
      { cName: "C++ Programming Fundamentals", cCode: "CPP111", id: 2 },
      { cName: "Computer Maintenance", cCode: "COMP1111", id: 3 },
      { cName: "Information Security 1", cCode: "IS1111", id: 4 },
    ],
    [
      { cName: "Networking", cCode: "NET222", id: 1 },
      { cName: "Web Technology", cCode: "WEB222", id: 2 },
      { cName: "Project Management 2", cCode: "PRO222", id: 3 },
    ],
    [
      { cName: "Advanced Project Management 1", cCode: "PRO333", id: 1 },
      { cName: "Advanced Computer Maintenance", cCode: "CPP222", id: 2 },
      { cName: "Advanced Information Security 1", cCode: "IS333", id: 3 },
    ],
    [
      { cName: "Advanced Networking", cCode: "NET444", id: 1 },
      { cName: "Advanced Computer Maintenance", cCode: "WEB444", id: 2 },
      { cName: "Advanced Information Security 1", cCode: "PRO444", id: 3 },
    ],
  ]);

  // <div className="term01" key={courseList.id}><h3>{courseList.cName}</h3><h4>{courseList.cCode}</h4></div>
  return (
    <div>
      <h1>My Courses</h1>

      <div className="courseList">
        <h1>Term 01</h1>
        {courseList[0].map((courseList) => (
          <div className="term01" key={courseList.id}>
            <h2>{courseList.cName}</h2>
            <p>{courseList.cCode}</p>
          </div>
        ))}
      </div>

      <div className="courseList">
        <h1>Term 02</h1>
        {courseList[1].map((courseList) => (
          <div className="term01" key={courseList.id}>
            <h2>{courseList.cName}</h2>
            <p>{courseList.cCode}</p>
          </div>
        ))}
      </div>
      <div className="courseList">
        <h1>Term 03</h1>
        {courseList[2].map((courseList) => (
          <div className="term01" key={courseList.id}>
            <h2>{courseList.cName}</h2>
            <p>{courseList.cCode}</p>
          </div>
        ))}
      </div>
      <div className="courseList">
        <h1>Term 04</h1>
        {courseList[3].map((courseList) => (
          <div className="term01" key={courseList.id}>
            <h2>{courseList.cName}</h2>
            <p>{courseList.cCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCourses;
