require("dotenv").config({ path: "../database/.env" }); // dotenv config is in other location

const jwt = require("jsonwebtoken"),
  requireAuth = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ err: "Authorization token required" });
    }
    const token = authorization.split(" ")[1];
    try {
      const _id = jwt.verify(token, process.env.SCRT);
      console.log(_id);
      // throw Error(_id);

      // req.user = await User.findOne({ _id }).select('_id');
      next();
    } catch (e) {
      console.log(e);
      res.status(401).json({ err: "Request unauthorized" });
    }
  };

module.exports = requireAuth;
