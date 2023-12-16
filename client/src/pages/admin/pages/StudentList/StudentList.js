// React & Javascript Components
import React, { useEffect, useState } from "react";
import useAuthContext from "../../../../hooks/useAuthContext";

// CSS
import "../../../../components/courselist/CourseList.css";

function StudentList() {
  // User Authentication
  const user = useAuthContext().user,
    // Student List
    [stdntList, setStdntList] = useState(null),
    // Search Filters
    [searchName, setSearchName] = useState(''),
    [searchEmail, setSearchEmail] = useState(''),
    filterErr = "ERROR:\nUsing two search filters at the same time\n\nSOLUTION:\nUse one search filter at a time by clearing out the other field",
    filterLst = () => {
      if (stdntList) {
        return stdntList.filter(stdnt => {
          return searchName.toLowerCase() === "" && searchEmail.toLowerCase() === ""
            ? stdnt
            // : (searchName.length > 0 ? stdnt.NameFirst.toLowerCase().includes(searchName.toLowerCase()) || stdnt.NameLast.toLowerCase().includes(searchName.toLowerCase())
            : (searchName.length > 0 ? `${stdnt.NameFirst} ${stdnt.NameLast}`.toLowerCase().includes(searchName.toLowerCase())
              :
              stdnt.Email.toLowerCase().includes(searchEmail.toLowerCase()));
        })
      }
    },
    filterDiv = () => {
      return (<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <strong>Name:&nbsp;</strong>
        <input
          placeholder='First name or last name...'
          onChange={event => searchEmail.length != 0 ? alert(filterErr) : setSearchName(event.target.value)}
          value={searchName}
          style={{ marginRight: "20px" }}
        />
        <strong>Email:&nbsp;</strong>
        <input
          placeholder='Search Email...'
          onChange={event => searchEmail.length != 0 ? alert(filterErr) : setSearchEmail(event.target.value)}
          value={searchEmail}
        />
      </div>);
    };

  // Get courses
  useEffect(() => {
    const email = user.email,
      listStudent = async (user) => {
        try {
          const response = await fetch("/api/58E1tuTbjL1YhkTZEV5IyXig2eK9q7jp/get/all/stdnt", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          }).then((res) => {
            return res.json();
          });
          if (response) {
            setStdntList(response);
          }
        } catch (err) {
          console.log("Error\n" + err.message);
        }
      };
    if (user && user.type === "admin") {
      listStudent(user);
    }
  }, [user]);

  return (
    <div>
      <h1>Student List</h1>
      <h2>View Student Info and Make Changes</h2>
      {filterDiv()}
      {filterLst() && filterLst().map((stdnt) => (
        // Render each course into individual sections
        <div className="courseList" key={stdnt.Email}>
          <h4 style={{ textAlign: "left", color: "black", textDecorationLine: "underline", marginBottom: "-10px" }}>
            Name
            <span style={{ float: "right", color: "black", textDecorationLine: "underline" }}>Email</span>
          </h4>
          <h2 style={{ textAlign: "left", color: "hsla(335, 100%, 40%, 1)" }}>
            {stdnt.NameLast},&nbsp;{stdnt.NameFirst}
            <span style={{ float: "right", color: "black" }}>
              {stdnt.Email}
            </span>
          </h2>
          <button onClick={() => alert("Hi")}>
            Withdraw
          </button>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
