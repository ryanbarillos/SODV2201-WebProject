/*
https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
*/

const e = require("express"),
  r = e.Router(),
  { getOne, getAll } = require("../controllers/controllerStudent");

//Test
r.get("/", (req, res) => {
  res.json({ ms: "test" });
});

// Get Student One
r.get("/:email/:passwd", getOne);

//Get Student All
r.get("/all", getAll);

//POST Student
r.post("/", async (req, res) => {
  const { email, passwd } = res.body;
  try {
    const login = new Login(email, passwd);
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
