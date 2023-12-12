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

courseGetAll = async () => {
  try {
    // Connect to database
    const pool = await sql.connect(config),
      //Query
      query = "SELECT * FROM Courses",
      result = await pool.request().query(query);
    pool.close();
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { courseEnroll, courseGetAll };
