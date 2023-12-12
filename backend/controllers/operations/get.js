const config = require("../../database/dbconfig"),
  sql = require("mssql");

//Find user id using email
getUserID = async (email) => {
  // Query for email
  const chk1_1 = `
    SELECT ID
    FROM Students
    WHERE Email = @email`,
    chk1_2 = `
      SELECT ID
      FROM Administrators
      WHERE Email = @email`,
    // Connect to db
    pool = await sql.connect(config);

  // Check in student db
  let id = (
    await pool.request().input("email", sql.NVarChar(255), email).query(chk1_1)
  ).recordset[0];

  if (!id) {
    // Check in admin db
    id = (
      await pool
        .request()
        .input("email", sql.NVarChar(255), email)
        .query(chk1_2)
    ).recordset[0];
    if (!id) {
      pool.close();
      throw Error("No account with that email found");
    }
  }
  pool.close();
  return id.ID;
};

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

module.exports = {
  getUsers,
  // getCourses,
  getUserID,
};
