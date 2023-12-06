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
//Student All
r.get("/all", getAll);

//DELETE Student
r.delete("/:id", (req, res) => {
  res.json({ ms: "delete" });
});

//UPDATE Student
r.patch("/:id", (req, res) => {
  res.json({ ms: "patch" });
});

module.exports = r;
