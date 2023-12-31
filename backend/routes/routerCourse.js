/*
https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
*/

const e = require("express"),
  r = e.Router(),
  reqAuth = require("../middleware/requireAuth"),
  dbo = require("../controllers/controllerCourse");

//Require authentication to access courses per student
r.use(reqAuth);

//Get Courses
r.get("/all/", dbo.courseGetAll);
r.get("/all/:studentID", dbo.courseSelect);
r.get("/mine/:studentID", dbo.courseGetMine);

// Enroll to specified course
r.post("/enroll/", dbo.courseEnroll);
// Withdraw from specified course
r.delete("/withdraw/", dbo.courseWithdraw);
module.exports = r;
