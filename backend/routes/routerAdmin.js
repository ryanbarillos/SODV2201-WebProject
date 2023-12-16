/*
https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
*/

const e = require("express"),
  r = e.Router(),
  reqAuth = require("../middleware/requireAuth"),
  dbo = require("../controllers/controllerAdmin");

//Require authentication to access courses per student
r.use(reqAuth);

// course add
r.post("/mk/crs/", dbo.cAdd);
// course remove
r.delete("/rm/crs", dbo.cDel);
// Student list get
r.post("/get/all/stdnt", dbo.getStdntAll)
// Get student forms
r.post("/get/all/stdnt/messages", dbo.getStdntAll)

// Enroll to specified course
// Withdraw from specified course

module.exports = r;
