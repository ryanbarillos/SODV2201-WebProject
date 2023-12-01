/*
  Reference(s) to Connect to MongoDB given 
  https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
  https://stackoverflow.com/questions/69436274/nodejs-cannot-connect-to-mongodb

  REFERENCE(s) for SQL Server
  https://stackoverflow.com/questions/60226370/certificate-error-when-connecting-to-sql-server
  https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage
*/

// Build SQL Server
require("dotenv").config();
const express = require("express"),
  app = express(),
  sql = require("mssql"),
  cors = require("cors"),
  port = process.env.PORT,
  config = {
    server: process.env.SRVR,
    user: process.env.NAME,
    password: process.env.PASS,
    database: process.env.DBSE,
    driver: process.env.DRVR,
    parseJSON: true,
    options: {
      trustedConnection: true,
      trustServerCertificate: true,
    },
  };

// Connect to Database
let pool,
  request = new sql.Request();

async function initialize() {
  try {
    pool = await sql.connect(config);
    console.log("Database Connected");
  } catch (err) {
    console.error("Connexion failed" + err);
  }
  // pool.close();
}

initialize();

/*
  GET
*/
// Courses List
app.get("/api/courses", async function (req, res) {
  try {
    const query = "SELECT * FROM Courses",
      result = await pool.request().query(query);
    res.json({ data: result.recordset });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Students List
app.get("/api/students", async function (req, res) {
  try {
    const query = "SELECT * FROM Students",
      result = await pool.request().query(query);
    res.json({ data: result.recordset });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Administrators List
app.get("/api/administrators", async function (req, res) {
  try {
    const query = "SELECT * FROM Administrators",
      result = await pool.request().query(query);
    res.json({ data: result.recordset });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// "Courses Enrolled" List
app.get("/api/courses-enrolled", async function (req, res) {
  try {
    const query = "SELECT * FROM CoursesEnrolled",
      result = await pool.request().query(query);
    res.json({ data: result.recordset });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
  POST
*/
// app.post("./signup", (req, res) => {
//     try {
//     const query = "SELECT * FROM Administrators",
//       result = await pool.request().query(query);
//     res.json({ data: result.recordset });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(port, () => {
  console.log("Server running on port " + port);
});
