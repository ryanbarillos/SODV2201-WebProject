// Requires are treated a functions in array
const dbo = [
  require("./operations/opAdmin"),
  require("./operations/opUser")
];

// Add Course
cAdd = async (req, res) => {
  const { email, name, code, term } = req.body,
    id = await dbo[1].getUserID(email);
  dbo[0]
    .cAdd(id, name, code, parseInt(term))
    .then(() => {
      console.log("NOTICE:\nA course has been created from the system. Please review changes.")
      res.status(200).json({ msg: "Course created" });
    })
    .catch((e) => {
      res.status(400).json({ err: e.message });
    });
};

// Delete Course
cDel = async (req, res) => {
  const { email, code } = req.body,
    id = await dbo[1].getUserID(email);
  dbo[0]
    .cDel(parseInt(id), code)
    .then(() => {
      console.log("NOTICE:\nA course has been deleted from the system. Please review changes.")
      res.status(200).json({ msg: "Course deleted " });
    })
    .catch((e) => {
      res.status(400).json({ err: e.message });
    });
};
module.exports = {
  cAdd,
  cDel,
};
