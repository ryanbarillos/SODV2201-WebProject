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

// Enroll or Withdraw student to specified course
r.post("/enroll/:studentID/:courseID", dbo.courseEnroll);
r.delete("/withdraw/:studentID/:courseID", dbo.courseWithdraw);

//DELETE Student
r.delete("/:id", (req, res) => {
  // to be implemented
  res.json({ ms: "delete" });
});

//UPDATE Student
r.patch("/:id", (req, res) => {
  // to be implemented
  res.json({ ms: "patch" });
});

module.exports = r;