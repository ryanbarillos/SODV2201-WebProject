const exp = require("express"),
  rtr = exp.Router(),
  //Controller Functions
  { userLogin, userSignup } = require("../controllers/UserController");

//Route Login
rtr.post("/login", userLogin);
rtr.post("/signup", userSignup);

module.exports = rtr;
