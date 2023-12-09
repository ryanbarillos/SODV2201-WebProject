/*
https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
*/

const e = require("express"),
  r = e.Router();
// reqAuth = require("../middleware/requireAuth");
// dbo = require("../controllers/operations/dboperations");

//Require authentication to access courses per student
// r.use(reqAuth);

//Get Courses
r.get("/all", (req, res) => {
  dbo.getCourses().then((data) => {
    // Returns 2d array; get only first array
    const result = data[0];
    res.json(result);
  });
});

//POST Student
r.post("/", (req, res) => {
  // const { email, passwd } = res.body;
  try {
    // const login = new Login(email, passwd);
  } catch (error) {
    res.status(404).json({ message: "User not found", error: error.message });
  }
});

//DELETE Student
r.delete("/:id", (req, res) => {
  res.json({ ms: "delete" });
});

//UPDATE Student
r.patch("/:id", (req, res) => {
  res.json({ ms: "patch" });
});

module.exports = r;
