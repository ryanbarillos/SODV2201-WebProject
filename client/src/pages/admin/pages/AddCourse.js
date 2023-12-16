import React, { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";

function AddCourse() {
  // User
  const user = useAuthContext().user,
    // React Variables
    [cName, cNameSet] = useState(""),
    [cCode, cCodeSet] = useState(""),
    [cTerm, cTermSet] = useState("1"),
    //Regex
    chkName =
      /^[A-Z]([a-zA-Z]+)?([+#-]{1,2})?\s([A-Z]([+#-]{1,2})?([a-z]+)?[\s]?)+[a-z1-4]$/,
    chkCode = /^[A-Z]{1,4}[1-9]{3}$/;

  const handleSubmit = (event) => {
    // Prevent form reset
    event.preventDefault();
    const isName = chkName.test(cName),
      isCode = chkCode.test(cCode),
      email = user.email;

    // Only perform operation with authorized admin
    if (user && user.type === "admin") {
      if (isName && isCode) {
        fetch("/api/58E1tuTbjL1YhkTZEV5IyXig2eK9q7jp/mk/crs/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            name: cName,
            code: cCode,
            term: cTerm,
          }),
        }).then((response) => {
          if (response.ok) {
            alert(
              "Operation: SUCCESS\n\nCourse has been added to the database"
            );
          } else {
            /*
              TO DO:
              Send error message that one or more field values
              already exists, thus reporting duplicates
            */
          }
        });
      } else {
        // Incorrect course name
        if (!isName) {
          alert(
            "ERROR:\nImproper course name\n\nSOLUTION:\nEnsure correct capitalization and spacing"
          );
        }
        // Incorrect course code
        if (!isCode) {
          alert(
            "ERROR:\nImproper course code\n\nSOLUTION:\nEnter 1 to 4 captital letters, followed by 3 digits"
          );
        }
      }
    } else {
      // Revoke access to site
      alert("ACCESS DENIED");
      // Remove credentials from local storage
      localStorage.removeItem("user");
    }
  };

  return (
    <div>
      <h1>Add Course</h1>
      <form onSubmit={handleSubmit}>
        <label>Course Name (Required)</label>
        <input
          type="text"
          value={cName}
          placeholder="Example Program F# C++ B-- Development"
          onChange={(newName) => cNameSet(newName.target.value)}
          required
        ></input>
        <label>Course Code (Required)</label>
        <input
          type="text"
          value={cCode}
          placeholder="ABC(D)123"
          onChange={(newCode) => cCodeSet(newCode.target.value)}
          required
        ></input>
        <label>Term Availability (Required)</label>
        <input
          type="number"
          min="1"
          max="4"
          default="1"
          value={cTerm}
          onChange={(cTerm) => cTermSet(cTerm.target.value)}
          required
        ></input>
        <button>Done</button>
      </form>
    </div>
  );
}

export default AddCourse;
