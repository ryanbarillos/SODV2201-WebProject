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
    try {
      dbo
        .userSignUp("bark@bvc.ca", "barkslide", "Back", "Slide")
        .then((data) => {
          // Returns 2d array; get only first value
          const result = data;
          res.status(200).json(result);
        });
    } catch (e) {
      res.status(404).json({ err: e.message });
    }
    // res.json({ m: "Signup" });
  };

module.exports = { userLogin, userSignup };
