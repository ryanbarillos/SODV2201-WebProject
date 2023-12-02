/*
  Reference(s) to Connect to MongoDB given 
  https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
  https://stackoverflow.com/questions/69436274/nodejs-cannot-connect-to-mongodb

  REFERENCE(s) for SQL Server
  https://stackoverflow.com/questions/60226370/certificate-error-when-connecting-to-sql-server
  https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage
  https://github.com/tediousjs/node-mssql#documentation
  https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
*/

// Modules Core
require("dotenv").config();
const express = require("express"),
  sql = require("mssql"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  //Modules Server Setup
  app = express(),
  port = process.env.PORT,
  config = require("./dbconfig"),
  //App Router
  router = express.Router(),
  routesUser = require("./routes/user");

//App Configuration
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors());
// .use("/api", router);

// Connect to Database
let database,
  query = "",
  request = new sql.Request();

async function initialize() {
  try {
    database = await sql.connect(config);
    console.log("Database Connected");
  } catch (err) {
    console.error("Connexion failed" + err);
  }
  // To end database connection
  // database.close();
}
initialize();

/*
  GET Requests
*/
// Students
app.get("/api/students", async (request, response) => {
  try {
    (query = "SELECT * FROM Students"),
      (result = await database.request().query(query));
    // response.json(result.recordset);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
  response.end();
});
app.post("/api/students/", async (request, response) => {
  try {
    const { email, passwd } = request.params;
    query = `
    SELECT studentEmail, studentPasswd
    FROM Students
    WHERE studentEmail = @email
    AND studentPasswd = @passwd`;
    result = await database
      .request()
      .input("email", sql.NVarChar(255), email)
      .input("passwd", sql.NVarChar(255), passwd)
      .query(query);
    response.json(result.recordset);
  } catch (error) {
    response
      .status(404)
      .json({ message: "User not found", error: error.message });
  }
});
// Courses List
app.get("/api/courses", async (request, response) => {
  try {
    (query = "SELECT * FROM Courses"),
      (result = await database.request().query(query));
    response.json(result.recordset);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});
// Administrators List
app.get("/api/administrators", async (request, response) => {
  try {
    (query = "SELECT * FROM Administrators"),
      (result = await database.request().query(query));
    response.json(result.recordset);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});
// "Courses Enrolled" List
app.get("/api/courses-enrolled", async (request, response) => {
  try {
    (query = "SELECT * FROM CoursesEnrolled"),
      (result = await database.request().query(query));
    response.json(result.recordset);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});

app.listen(port || 3001, () => {
  console.log("Server running on port " + port);
});
