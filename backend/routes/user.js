const e = require("express"),
  r = e.Router(),
  { userLogin, userSignup } = require("../controllers/controllerUser");

//Sign In Route
r.post("/login", userLogin);

//Sign Up Route
r.post("/signup", userSignup);

module.exports = r;
