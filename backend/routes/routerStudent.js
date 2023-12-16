/*
https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
*/

const e = require("express"),
  r = e.Router(),
  reqAuth = require("../middleware/requireAuth"),
  dbo = require("../controllers/controllerStudent");

//Require authentication to access courses per student
r.use(reqAuth);

// course add
r.post("/send/msg/", dbo.msgSubmit);
module.exports = r;
