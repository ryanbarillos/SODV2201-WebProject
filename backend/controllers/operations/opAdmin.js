const config = require("../../database/dbconfig"),
  sql = require("mssql");

// course add
cAdd = async (adminID, cName, cCode, cTerm) => {
  const pool = await sql.connect(config);
  // Invoke anonymous function
  try {
    (async () => {
      await pool
        .request()
        .input("adminID", sql.Int, adminID)
        .input("cName", sql.NVarChar(255), cName)
        .input("cCode", sql.NVarChar(7), cCode)
        .input("cTerm", sql.Int, cTerm)
        .execute("cAdd");
      pool.close();
    })();
  } catch (err) {
    throw Error(err);
  }
};

// course remove
cDel = async (aID, cCode) => {
  console.log(aID);
  console.log(cCode);
  const pool = await sql.connect(config);
  // Invoke anonymous function
  try {
    (async () => {
      await pool
        .request()
        .input("aID", sql.Int, aID)
        .input("cCode", sql.NVarChar(7), cCode)
        .execute("cDel");
      pool.close();
    })();
  } catch (err) {
    console.log(err);
  }
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
  cAdd,
  cDel,
};
