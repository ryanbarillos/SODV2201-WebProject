import React, { useState } from "react";

function RemoveCourse() {
  const [cName, cNameSet] = useState("");
  const [cCode, cCodeSet] = useState("");
  const [cDateStart, cDateStartSet] = useState("");
  const [cDateEnd, cDateEndSet] = useState("");
  const handleSubmit = (e) => {
    // To not immediately lose all form values via refreshing upon submitting

    const newCourse = { cName, cCode, cDateStart, cDateEnd };
    alert("Course Removed!");
  };

  return (
    <div>
      <h1>Remove Course</h1>
      <form onSubmit={handleSubmit}>
        <label>Course Name (Optional)</label>
        <input
          type="text"
          value={cName}
          onChange={(newName) => cNameSet(newName.target.value)}
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
          type="date"
          value={cDateStart}
          onChange={(cDateStart) => cDateStartSet(cDateStart.target.value)}
          required
        ></input>
        <label>End Date (Required)</label>
        <input
          type="date"
          value={cDateEnd}
          onChange={(cDateEnd) => cDateEndSet(cDateEnd.target.value)}
          required
        ></input>
        <button>Done</button>
      </form>
    </div>
  );
}

export default RemoveCourse;
