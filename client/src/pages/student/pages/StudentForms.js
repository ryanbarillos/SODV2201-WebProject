import React, { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";

function StudentForms() {
  // User
  const user = useAuthContext().user,
    // Message
    [msg, setMsg] = useState(""),
    maxCharLength = 280,
    leftCharLength = maxCharLength - msg.length;

  const handleSubmit = (e) => {
    // Prevent reset
    e.preventDefault();

    // Make post request
    fetch("/api/sKSgljbMf5GAf7vxFzuQVqtrTNXsFMio/send/msg/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        sMsg: msg
      }),
    }).then((response) => {
      if (response.ok) {
        alert(
          "Operation: SUCCESS\n\nYour message has been delivered. We will answer back as soon as possible."
        );
      } else {
        alert(
          "Operation: FAILED\n\nYour message was not delivered. Please try again."
        );
      }
    });

  };

  return (
    <div>
      <h1>Student Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Your Message (Required)</label>
        <textarea
          name="message"
          id="messageBox"
          placeholder="Enter Your Message Here"
          maxlength={maxCharLength}
          style={{ resize: "vertical" }}
          value={msg}
          onChange={(event) => { setMsg(event.target.value) }}
          required
        />
        <p style={{ textAlign: "left", fontSize: "14px", marginBottom: "-15px" }}>{leftCharLength} characters left</p>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default StudentForms;
