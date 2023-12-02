/*
https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
*/

const e = require("express"),
  r = e.Router(),
  { verify, getAll } = require("../controllers/controllerStudent");

//Test
r.get("/", (req, res) => {
  res.json({ ms: "test" });
});

/*
GET REQUESTS
*/
//Student One
r.get("/:email/:passwd", verify);

//Student All
r.get("/all", getAll);

/*
POST REQUESTS
*/
r.post("/", async (req, res) => {
  const { email, passwd } = res.body;
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
