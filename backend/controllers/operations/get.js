const { config } = require("../../database/dbconfig"),
  sql = require("mssql");

getUsers = async (user) => {
  let query;
  switch (user) {
    case "student":
      query = "SELECT studentID, studentTerm FROM Students";
      break;
    case "administrator":
      query = "SELECT adminID, FROM Administrators";
      break;
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

getCourses = async () => {
  try {
    // Connect to database
    let pool = await sql.connect(config),
      //Query
      query = "SELECT * FROM Courses",
      result = await pool.request().query(query);
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getCourses,
};
