// Requires are treated a functions in array
const dbo = [
  require("./operations/opAdmin"),
  require("./operations/opUser"),
  require("./operations/opCourse"),
];

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
courseWithdraw = async (req, res) => {
  const studentID = await getUserID(req.params.studentID),
    courseID = req.params.courseID;
  dbo
    .courseWithdraw(studentID, courseID)
    .then(() => {
      res.status(200).json({ msg: "Course withdrawn" });
    })
    .catch((e) => {
      res.status(400).json({ err: e.message });
    });
};

module.exports = {
  cAdd,
};
