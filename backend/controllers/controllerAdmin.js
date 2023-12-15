// Requires are treated a functions in array
const dbo = [
  require("./operations/opAdmin"),
  require("./operations/opUser"),
  require("./operations/opCourse"),
];

// Add Course
cAdd = async (req, res) => {
  const { email, name, code, term } = req.body,
    id = await dbo[1].getUserID(email);
  dbo[0]
    .cAdd(id, name, code, parseInt(term))
    .then(() => {
      res.status(200).json({ msg: "Course enrolled" });
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
    .cAdd(id, code)
    .then(() => {
      res.status(200).json({ msg: "Course deleted" });
    })
    .catch((e) => {
      res.status(400).json({ err: e.message });
    });
};
module.exports = {
  cAdd,
  cDel,
};
