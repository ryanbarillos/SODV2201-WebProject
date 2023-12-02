const userLogin = async (request, response) => {
  response.json({ message: "User Login" });
};

const userSignup = async (request, response) => {
  response.json({ message: "User Sign Up" });
};

module.exports = { userLogin, userSignup };
