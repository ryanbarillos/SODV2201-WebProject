const { config } = require("../../database/dbconfig"),
  sql = require("mssql");

delUser = async (user, target, id) => {
  let query;
  if (user === "administrator") {
    switch (target) {
      case "student":
        query = "DELETE FROM Students WHERE studentID = @id";
        break;
      case "administrator":
        query = "DELETE FROM Administrators WHERE adminID = @id";
        break;
    }
  }

  try {
    // Connect to database
    const pool = await sql.connect(config),
      //Query
      result = await pool.request().query(query);
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
};

delCourse = async (id) => {
  //Query for student or admin that exists
  const query = "DELETE FROM Courses WHERE courseID = @id";

  try {
    // Connect to database
    const pool = await sql.connect(config),
      result = await pool
        .request()
        .input("id", sql.NVarChar(255), id)
        .query(query);
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getCourses,
};
