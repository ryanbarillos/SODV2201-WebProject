require("dotenv").config({ path: "../database/.env" }); // dotenv config is in other location
const jwt = require("jsonwebtoken"),
  { getUserID } = require("../controllers/operations/get"),
  requireAuth = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ err: "Authorization token required" });
    }
    // Extract jwt from Bearer Token
    const token = authorization.split(" ")[1];
    try {
      // This returns a 3-property JSON; only pull email
      const email = jwt.verify(token, process.env.SCRT).id;
      req.user = getUserID(email);
      next();
    } catch (e) {
      console.log(e);
      res.status(401).json({ err: "Request unauthorized" });
    }
  };

module.exports = requireAuth;
