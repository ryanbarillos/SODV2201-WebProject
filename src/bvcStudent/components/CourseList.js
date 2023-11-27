const CourseList = ({ courses, term }) => {
  let list = courses.filter((course) => course.term === term);
  return (
    <div>
      {list.map((course) => (
        // Render each course into individual sections
        <div className="courseList">
          <h2 style={{ textAlign: "left", color: "red" }}>
            {course.name}
            <span style={{ float: "right", color: "black" }}>
              {course.code}
            </span>
          </h2>
          <button>Add Course</button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
