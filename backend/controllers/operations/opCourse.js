const config = require("../../database/dbconfig"),
  sql = require("mssql");

// Enroll course
courseEnroll = async (studentID, courseID) => {
  const pool = await sql.connect(config);
  // Invoke anonymous function
  (async () => {
    await pool
      .request()
      .input("studentID", sql.Int, studentID)
      .input("courseID", sql.Int, courseID)
      .execute("Enroll");
    pool.close();
  })();
};
courseWithdraw = async (studentID, courseID) => {
  const pool = await sql.connect(config);
  // Invoke anonymous function
  (async () => {
    await pool
      .request()
      .input("studentID", sql.Int, studentID)
      .input("courseID", sql.Int, courseID)
      .execute("Withdraw");
    pool.close();
  })();
};

courseGetAll = async () => {
  try {
    // Connect to database
    const pool = await sql.connect(config),
      //Query
      query = "SELECT * FROM Courses",
      result = await pool.request().query(query);
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
  }
};

courseSelect = async (id, term) => {
  try {
    // Connect to database
    const pool = await sql.connect(config),
      /*
        Show courses with following constraints:
        —Within the student's term
        —Not already enrolled by student
      */
      query = `
      SELECT *
      FROM Courses
      WHERE CourseTerm = @term
      AND CourseID NOT IN (SELECT CourseID
      FROM CoursesEnrolled
      WHERE StudentID = @id)`,
      result = await pool
        .request()
        .input("term", sql.Int, term)
        .input("id", sql.Int, id)
        .query(query);
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
  }
};

courseGetMine = async (id) => {
  try {
    // Connect to database
    const pool = await sql.connect(config),
      //Query
      query = `
      SELECT *
      FROM Courses
      WHERE CourseID IN (SELECT CourseID
      FROM CoursesEnrolled
      WHERE StudentID = @id)`,
      result = await pool.request().input("id", sql.Int, id).query(query);
    pool.close();
    return result.recordsets[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  courseEnroll,
  courseGetAll,
  courseSelect,
  courseGetMine,
  courseWithdraw,
};
