// Requires are treated a functions in array
const dbo = [require("./operations/user"), require("./operations/get")];

const verify = (req, res) => {
    const email = req.params.email,
      passwd = req.params.passwd;

    dbo[0].userSignIn(email, passwd, "student").then((data) => {
      // Returns 2d array; get only first value
      const result = data[0][0];
      res.status(200).json(result);
    });
  },
  getAll = (req, res) => {
    dbo[1].getUsers("student").then((data) => {
      // Returns 2d array; get only first value
      const result = data[0];
      res.status(200).json(result);
    });
  };

const make = async (request, response) => {
  // response.json({ message: "User Sign Up" });
};

module.exports = { verify, getAll };
