import React, { useState } from "react";

function SearchCourse() {
  const [cName, cNameSet] = useState("");
  const [cCode, cCodeSet] = useState("");
  const [cDateStart, cDateStartSet] = useState("");
  const [cDateEnd, cDateEndSet] = useState("");
  const handleSubmit = (e) => {
    // To not immediately lose all form values via refreshing upon submitting

    const newCourse = { cName, cCode, cDateStart, cDateEnd };
  };

  return (
    <div>
      <h1>Search Course</h1>
      <form onSubmit={handleSubmit}>
        <label>Course Name (Optional)</label>
        <input
          type="text"
          value={cName}
          onChange={(newName) => cNameSet(newName.target.value)}
        ></input>
        <label>Course Code (Optional)</label>
        <input
          type="text"
          value={cCode}
          onChange={(newCode) => cCodeSet(newCode.target.value)}
        ></input>
        <label>Start Date (Optional)</label>
        <input
          type="date"
          value={cDateStart}
          onChange={(cDateStart) => cDateStartSet(cDateStart.target.value)}
        ></input>
        <label>End Date (Optional)</label>
        <input
          type="date"
          value={cDateEnd}
          onChange={(cDateEnd) => cDateEndSet(cDateEnd.target.value)}
        ></input>
        <button>Done</button>
      </form>
    </div>
  );
}

export default SearchCourse;
