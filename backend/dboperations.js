const { config } = require("./dbconfig"),
  sql = require("mssql");

getUser = async (email, passwd, user) => {
  //Query for student or admin that exists
  const query =
    user === "student"
      ? `SELECT studentID, studentEmail
      FROM Students
      WHERE studentEmail = @email
      AND studentPasswd = @passwd`
      : `SELECT adminID, adminEmail
      FROM Administrators
      WHERE adminEmail = @email
      AND adminPasswd = @passwd`;

  try {
    // Connect to database
    const pool = await sql.connect(config),
      result = await pool
        .request()
        .input("email", sql.NVarChar(255), email)
        .input("passwd", sql.NVarChar(255), passwd)
        .query(query);
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
};

getUsers = async (user) => {
  let query;
  switch (user) {
    case "student":
      query = "SELECT studentID, studentEmail, studentTerm FROM Students";
      break;
    case "administrator":
      query = "SELECT adminID, adminEmail FROM Administrators";
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

module.exports = { getUser, getUsers, getCourses };
