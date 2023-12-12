// Requires are treated a functions in array
const dbo = require("./operations/course");

const userLogin = async (req, res) => {
    const { email, passwd } = req.body;
    dbo
      .userLogin(email, passwd)
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
      .userSignup(email, passwd, namef, namel, type)
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
