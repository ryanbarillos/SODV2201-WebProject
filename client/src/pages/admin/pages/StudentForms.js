// React & Javascript Components
import React, { useEffect, useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";

// CSS
import "../../../components/courselist/CourseList.css";

function StudentForms() {
  const user = useAuthContext().user,
    [msgList, setMsgList] = useState(null);
  // Get courses
  useEffect(() => {
    const courseList = async (user) => {
      try {
        const response = await fetch("/api/58E1tuTbjL1YhkTZEV5IyXig2eK9q7jp/get/all/stdnt/messages", {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }).then((res) => {
          return res.json();
        });
        if (response) {
          setMsgList(response.length > 0 ? response : msgList);
        }
      } catch (err) {
        console.log("Error\n" + err.message);
      }
    };
    if (user && user.type === "admin") {
      courseList(user);
    }
  }, [user, msgList]);
  return (
    <div>
      <h1>Student Forms</h1>
      <h2>Messages sent by students to respond</h2>
      {!msgList && <h3 style={{ textDecorationLine: "underline" }}>No messages today. Check back later</h3>}
      {msgList && msgList.map((msg) => (
        // Render each course into individual sections
        <div className="courseList" key={msg.ID}>
          <h4 style={{ textAlign: "left", color: "black", textDecorationLine: "underline", marginBottom: "-10px" }}>
            Sent By
            <span style={{ float: "right", color: "black", textDecorationLine: "underline" }}>Sent On</span>
          </h4>
          <h2 style={{ textAlign: "left", color: "hsla(335, 100%, 40%, 1)" }}>
            {msg.NameLast},&nbsp;{msg.NameFirst}
            <span style={{ float: "right", color: "black", fontSize: "15px" }}>
              {msg.DateSentOn}
            </span>
          </h2>
          <button onClick={() => alert(`Sent by ${msg.NameFirst} ${msg.NameLast}:\n--------------\n${msg.Message}`)}>Read Message</button>
        </div>
      ))}
    </div>
  );
}

export default StudentForms;
