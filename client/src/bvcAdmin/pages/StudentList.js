
import React, { useState } from "react";

function StudentList() {
  const [programName, setProgramName] = useState("");
  const [students, setStudents] = useState([]);

  const addStudent = () => {
    if (students.length < 5) {
      setStudents([...students, { name: "", id: "" }]);
    }
  };

  const handleStudentNameChange = (index, newName) => {
    const updatedStudents = [...students];
    updatedStudents[index].name = newName;
    setStudents(updatedStudents);
  };

  const handleStudentIdChange = (index, newId) => {
    const updatedStudents = [...students];
    updatedStudents[index].id = newId;
    setStudents(updatedStudents);
  };

  return (
    <div>
      <h1>Student List</h1>
      <label>Program Name:</label>
      <input
        type="text"
        value={programName}
        onChange={(e) => setProgramName(e.target.value)}
      />
      <div>
        {students.map((student, index) => (
          <div key={index}>
            <p>Student #{index + 1}</p>
            <label>Name:</label>
            <input
              type="text"
              value={student.name}
              onChange={(e) => handleStudentNameChange(index, e.target.value)}
            />
            <label>Student ID:</label>
            <input
              type="text"
              value={student.id}
              onChange={(e) => handleStudentIdChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={addStudent}>Add Student</button>
      <button>Go Back</button>
    </div>
  );
}

export default StudentList;


