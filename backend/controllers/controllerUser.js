// Requires are treated a functions in array
const dbo = require("./operations/user");

const userLogin = async (req, res) => {
    // const email = req.params.email,
    //   passwd = req.params.passwd;

    // dbo.userSignIn(email, passwd, "student").then((data) => {
    //   // Returns 2d array; get only first value
    //   const result = data[0][0];
    //   res.status(200).json(result);
    // });
    res.json({ m: "Login" });
  },
  userSignup = async (req, res) => {
    const { email, passwd, namef, namel } = req.body;
    dbo
      .userSignUp(email, passwd, namef, namel)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(404).json({ err: e.message });
      });
    // try {
    //   // Returns 2d array; get only first value
    //   dbo.userSignUp(email, passwd, namef, namel);
    //   res.status(200).json({ email, passwd, namef, namel });
    // } catch (e) {
    //   res.status(404).json({ Mayday: e });
    //   console.clear().log("Mayday\n" + e.message);
    // }
  };

module.exports = { userLogin, userSignup };
