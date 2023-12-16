/*
  REFERENCE(s):
    Search filter
    https://youtu.be/xAqCEBFGdYk?si=ZvuTf03483_b7R7J
*/

// Authentication
import useAuthContext from "../../hooks/useAuthContext";
// CSS
import "./CourseList.css";

import { useState } from "react";
const CourseList = ({ courses, term, mode }) => {
  // Local Variables
  const user = useAuthContext().user,
    [list, setList] = useState(
      mode === "edit" || "show"
        ? courses
        : courses.filter((c) => c.CourseTerm === term)
    ),
    // Filter Search
    [searchName, setSearchName] = useState(''),
    [searchCode, setSearchCode] = useState(''),
    filterErr = "ERROR:\nUsing two search filters at the same time\n\nSOLUTION:\nUse one search filter at a time by clearing out the other field",
    filterDiv = () => {
      return (<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <strong>Name:&nbsp;</strong>
        <input
          placeholder='Search Name...'
          onChange={event => searchCode.length !== 0 ? alert(filterErr) : setSearchName(event.target.value)}
          value={searchName}
          style={{ marginRight: "20px" }}
        />
        <strong>Code:&nbsp;</strong>
        <input
          placeholder='Search Code...'
          onChange={event => searchName.length !== 0 ? alert(filterErr) : setSearchCode(event.target.value)}
          value={searchCode}
        />
      </div>);
    },
    filterLst = list.filter(c => {
      return searchName.toLowerCase() === "" && searchCode.toLowerCase() === ""
        ? c
        : (searchName.length > 0 ? c.CourseName.toLowerCase().includes(searchName.toLowerCase())
          :
          c.CourseCode.toLowerCase().includes(searchCode.toLowerCase()));
    }),
    /*
      Enroll student to course
    */
    courseEnroll = (cCode) => {
      if (user && user.type === "stdnt") {
        const email = user.email;
        fetch(`/api/course/enroll/`, {
          method: "POST",
          headers: {
            // To authorize transaction
            Authorization: `Bearer ${user.token}`,
            // To send body
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            code: cCode,
          }),
        }).then((response) => {
          if (response.ok) {
            alert("You've enrolled in this course!");
            // Reflect changes on frontend
            setList(list.filter((c) => c.CourseCode !== cCode));
          }
        });
      }
    },
    /*
      Withdraw course
    */
    courseWithdraw = (cCode) => {
      if (user && user.type === "stdnt") {
        const email = user.email;
        fetch(`/api/course/withdraw/`, {
          method: "DELETE",
          headers: {
            // To authorize transaction
            Authorization: `Bearer ${user.token}`,
            // To send body
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            code: cCode,
          }),
        }).then((response) => {
          if (response.ok) {
            alert("You've withdrawn from this course!");
            // Reflect changes on frontend
            setList(list.filter((c) => c.CourseCode !== cCode));
          }
        });
      }
    },
    courseDelete = (cCode) => {
      if (user.type === "admin") {
        const email = user.email;
        fetch("/api/58E1tuTbjL1YhkTZEV5IyXig2eK9q7jp/rm/crs", {
          method: "DELETE",
          headers: {
            // To authorize transaction
            Authorization: `Bearer ${user.token}`,
            // To send body
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            code: cCode,
          }),
        }).then((response) => {
          if (response.ok) {
            alert("Operation: SUCCESS\n\nCourse has been DELETED to the database");
            // Reflect changes on frontend
            setList(list.filter((c) => c.CourseCode !== cCode));
          }
        });
      }
    };
  /*
    Delete Course
    ADMIN ONLY
  */


  switch (mode) {
    case "enroll":
      return (
        <div>
          {filterDiv()}
          {filterLst.map((c) => (
            // Render each course into individual sections
            <div className="courseList" key={c.CourseCode}>
              <h2
                style={{ textAlign: "left", color: "hsla(335, 100%, 40%, 1)" }}
              >
                {c.CourseName}
                <span style={{ float: "right", color: "black" }}>
                  {c.CourseCode}
                </span>
              </h2>
              <button onClick={() => courseEnroll(c.CourseCode)}>
                Add Course
              </button>
            </div>
          ))}
        </div>
      );
    case "show":
      return (
        <div>
          {filterDiv()}
          {filterLst.map((c) => (
            // Render each course into individual sections
            <div className="courseList" key={c.CourseCode}>
              <h2
                style={{ textAlign: "left", color: "hsla(335, 100%, 40%, 1)" }}
              >
                {c.CourseName}
                <span style={{ float: "right", color: "black" }}>
                  {c.CourseCode}
                </span>
              </h2>
              {/* <button onClick={() => courseWithdraw(c.CourseCode)}> */}
              <button onClick={() => courseWithdraw(c.CourseCode)}>
                Withdraw
              </button>
            </div>
          ))}
        </div>
      );
    case "edit":
      return (
        <div>
          {filterDiv()}
          {filterLst.map((c) => (
            // Render each course into individual sections
            <div className="courseList" key={c.CourseCode}>
              <h4 style={{ textAlign: "left", color: "black", textDecorationLine: "underline", marginBottom: "-10px" }}>
                Course Name
                <span style={{ float: "right", color: "black", textDecorationLine: "underline" }}>Term {c.CourseTerm}</span>
              </h4>
              <h2 style={{ textAlign: "left", color: "hsla(335, 100%, 40%, 1)" }}>
                {c.CourseName}
                <span style={{ float: "right", color: "black" }}>{c.CourseCode}</span>
              </h2>
              <button onClick={() => alert("To be added")}>Modify</button>
              <button onClick={() => courseDelete(c.CourseCode)}>Delete</button>
            </div>
          ))}
        </div >
      );
  }
};

export default CourseList;
