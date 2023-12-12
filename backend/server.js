/*
  REFERENCE(s) for SQL Server
  https://stackoverflow.com/questions/60226370/certificate-error-when-connecting-to-sql-server
  https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage
  https://github.com/tediousjs/node-mssql#documentation
  https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database

  Using dotenv
  https://www.npmjs.com/package/dotenv#path

  Everything else
  https://stackoverflow.com/questions/15128849/using-multiple-parameters-in-url-in-express
*/

// Modules Core
require("dotenv").config({ path: "./database/.env" }); // dotenv config is in other location
const express = require("express"),
  app = express(),
  port = process.env.PORT,
  routerCourse = require("./routes/routerCourse"),
  routerUser = require("./routes/routerUser");

/*
  Middleware
  App Configuration
*/
const data = express.json(); //Use to retreive for data
app.use(data);

/*
Router
*/
app.use("/api/user", routerUser);
app.use("/api/course", routerCourse);

app.listen(port || 3001, () => {
  console.log("Server running on port " + port);
});
