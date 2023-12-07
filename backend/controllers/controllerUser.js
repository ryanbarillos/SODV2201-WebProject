// Requires are treated a functions in array
require("dotenv").config({ path: "./database/.env" }); // dotenv config is in other location
const dbo = require("./operations/user"),
  jwt = require("jsonwebtoken"),
  mkToken = (id) => {
    return jwt.sign({ id }, process.env.SCRT, { expiresIn: "2h" });
  };

const userLogin = async (req, res) => {
    const { email, passwd } = req.body;
    dbo
      .userSignIn(email, passwd, "student")
      .then(() => {
        // Generate JSON Web Token to make login session
        const token = mkToken(email);
        res.status(200).json({ email, token });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({ err: e.message });
      });
  },
  userSignup = async (req, res) => {
    const { email, passwd, namef, namel } = req.body;
    dbo
      .userSignUp(email, passwd, namef, namel)
      .then(() => {
        // Generate JSON Web Token to make login session
        const token = mkToken(email);
        res.status(200).json({ email, token });
      })
      .catch((e) => {
        res.status(400).json({ err: e.message });
      });
    // try {
    //   // Returns 2d array; get only first value
    //   dbo.userSignUp(email, passwd, namef, namel);
    //   res.status(200).json({ email, passwd, namef, namel });
    // } catch (e) {
    //   res.status(400).json({ Mayday: e });
    //   console.clear().log("Mayday\n" + e.message);
    // }
  };

module.exports = { userLogin, userSignup };
