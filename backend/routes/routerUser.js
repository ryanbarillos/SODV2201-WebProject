const e = require("express"),
  r = e.Router(),
  dbo = require("../controllers/controllerUser");

//Sign In Route
r.post("/login", dbo.userLogin);

//Sign Up Route
r.post("/signup", dbo.userSignup);

module.exports = r;
