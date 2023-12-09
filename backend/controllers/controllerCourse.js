const dbo = require("./operations/get");

const verify = (req, res) => {
    const email = req.params.email,
      passwd = req.params.passwd;

    dbo.verifyUser(email, passwd, "student").then((data) => {
      // Returns 2d array; get only first value
      const result = data[0][0];
      res.status(200).json(result);
    });
  },
  getAll = (req, res) => {
    dbo.getUsers("student").then((data) => {
      // Returns 2d array; get only first value
      const result = data[0];
      res.status(200).json(result);
    });
  };

const make = async (request, response) => {
  // response.json({ message: "User Sign Up" });
};

module.exports = { verify, getAll };