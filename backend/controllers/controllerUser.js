// Requires are treated a functions in array
require("dotenv").config({ path: "./database/.env" }); // dotenv config is in other location
const dbo = require("./operations/user"),
  jwt = require("jsonwebtoken"),
  mkToken = (id) => {
    return jwt.sign({ id }, process.env.SCRT, { expiresIn: "1h" });
  };

const userLogin = async (req, res) => {
    const { email, passwd } = req.body;
    dbo
      .userSignIn(email, passwd)
      .then((type) => {
        // Generate JSON Web Token to make login session
        const token = mkToken(email);
        res.status(200).json({ email, token, type });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({ err: e.message });
      });
  },
  userSignup = async (req, res) => {
    const { email, passwd, namef, namel, type } = req.body;
    dbo
      .userSignUp(email, passwd, namef, namel, type)
      .then(() => {
        // Generate JSON Web Token to make login session
        const token = mkToken(email);
        res.status(200).json({ email, token, type });
      })
      .catch((e) => {
        res.status(400).json({ err: e.message });
      });
  };

module.exports = { userLogin, userSignup };
