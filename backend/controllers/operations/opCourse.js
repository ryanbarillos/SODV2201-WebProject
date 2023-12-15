const config = require("../../database/dbconfig"),
  sql = require("mssql");

// Enroll course
courseEnroll = async (id, code) => {
  const pool = await sql.connect(config);
  // Invoke anonymous function
  (async () => {
    await pool
      .request()
      .input("sID", sql.Int, id)
      .input("cCode", sql.NVarChar(7), code)
      .execute("Enroll");
    pool.close();
  })();
};
courseWithdraw = async (id, code) => {
  // throw Error(`${id}\n${code}`);
  const pool = await sql.connect(config);
  // Invoke anonymous function
  (async () => {
    await pool
      .request()
      .input("sID", sql.Int, id)
      .input("cCode", sql.NVarChar(7), code)
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
      AND CourseCode NOT IN (SELECT CourseCode
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
      WHERE CourseCode IN (SELECT CourseCode
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
