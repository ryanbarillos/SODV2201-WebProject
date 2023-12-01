const CourseList = ({ courses, term }) => {
  let list = courses.filter((c) => c.courseTerm === term);
  return (
    <div>
      {list.map((c) => (
        // Render each course into individual sections
        <div className="courseList">
          <h2 style={{ textAlign: "left", color: "red" }}>
            {c.courseName}
            <span style={{ float: "right", color: "black" }}>
              {c.courseCode}
            </span>
          </h2>
          <button>Add Course</button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
