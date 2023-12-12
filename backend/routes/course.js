/*
https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
*/

const e = require("express"),
  r = e.Router();
const reqAuth = require("../middleware/requireAuth");
dbo = require("../controllers/operations/course");

//Require authentication to access courses per student
r.use(reqAuth);
//Get Courses
r.get("/all", (req, res) => {
  dbo.getCourses().then((data) => {
    // Returns 2d array; get only first array
    const result = data[0];
    res.json(result);
  });
});

// Enroll Course
r.post("/enroll/:studentID/:courseID", (req, res) => {});

//DELETE Student
r.delete("/:id", (req, res) => {
  res.json({ ms: "delete" });
});

//UPDATE Student
r.patch("/:id", (req, res) => {
  res.json({ ms: "patch" });
});

module.exports = r;
