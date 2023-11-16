
import React, { useState } from "react";

function StudentForms() {
  const [studentName, setStudentName] = useState("");
  const [studentProgram, setStudentProgram] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = { name: studentName, program: studentProgram };
    alert("Student Form Submitted!");
  };

  return (
    <div>
      <h1>Student Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Student Name (Required)</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <label>Program (Required)</label>
        <input
          type="text"
          value={studentProgram}
          onChange={(e) => setStudentProgram(e.target.value)}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default StudentForms;
