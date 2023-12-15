/*
  REFERENCE(s):
  -- MSSQL Server Promises to prevent connection errors
  https://stackoverflow.com/q/35038516
  https://github.com/tediousjs/node-mssql#promises

  -- MSSQL Server Stored Procedures
  https://github.com/tediousjs/node-mssql#stored-procedures

  -- Async/Await
  https://github.com/tediousjs/node-mssql#asyncawait
*/

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
  const query = "SELECT * FROM Courses ORDER BY CourseTerm, CourseName",
    result = await sql.connect(config)
      .then((pool) => {
        return pool.request().query(query);
      })
      .catch((err) => {
        console.log(err);
      });
  return result.recordsets[0];
};

courseSelect = async (id, term) => {
  try {
    /*
      Show courses with following constraints:
      —Within the student's term
      —Not already enrolled by student
    */
    const query = `
      SELECT *
      FROM Courses
      WHERE CourseTerm = @term
      AND CourseCode NOT IN (SELECT CourseCode
      FROM CoursesEnrolled
      WHERE StudentID = @id)`,
      result = await sql.connect(config).then(pool => {
        return pool.request()
          .input("term", sql.Int, term)
          .input("id", sql.Int, id)
          .query(query);
      })
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
};

courseGetMine = async (id) => {
  try {
    const query = `
      SELECT *
      FROM Courses
      WHERE CourseCode IN (SELECT CourseCode
      FROM CoursesEnrolled
      WHERE StudentID = @id)`,
      result = await sql.connect(config).then(pool => {
        return pool.request().input("id", sql.Int, id).query(query);
      })
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  courseEnroll,
  courseGetAll,
  courseSelect,
  courseGetMine,
  courseWithdraw,
};
