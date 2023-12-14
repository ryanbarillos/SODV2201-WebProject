import React, { useState } from "react";

function AddCourse() {
  // React Variables
  const [cName, cNameSet] = useState(""),
    [cCode, cCodeSet] = useState(""),
    [cTerm, cTermSet] = useState("1");
  //Regex

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(typeof cTerm);
    // To not immediately lose all form values via refreshing upon submitting

    // const newCourse = { cName, cCode, cTerm };
    // alert("Course Added!");
  };

  return (
    <div>
      <h1>Add Course</h1>
      <form onSubmit={handleSubmit}>
        <label>Course Name (Required)</label>
        <input
          type="text"
          value={cName}
          onChange={(newName) => cNameSet(newName.target.value)}
          required
        ></input>
        <label>Course Code (Required)</label>
        <input
          type="text"
          value={cCode}
          onChange={(newCode) => cCodeSet(newCode.target.value)}
          required
        ></input>
        <label>Start Date (Required)</label>
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
