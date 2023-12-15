// Requires are treated a functions in array
const dbo = require("./operations/opCourse"),
  { getUserID, getStdntTerm } = require("./operations/opUser");

const courseGetAll = async (req, res) => {
  dbo
    .courseGetAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ err: e.message });
    });
},
  courseSelect = async (req, res) => {
    const studentID = await getUserID(req.params.studentID),
      term = await getStdntTerm(studentID);
    dbo
      .courseSelect(studentID, term)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json({ err: e.message });
      });
  },
  courseGetMine = async (req, res) => {
    const studentID = await getUserID(req.params.studentID);
    dbo
      .courseGetMine(studentID)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json({ err: e.message });
      });
  },
  courseEnroll = async (req, res) => {
    const { email, code } = req.body,
      id = await getUserID(email);
    dbo
      .courseEnroll(id, code)
      .then(() => {
        res.status(200).json({ msg: "Course enrolled" });
      })
      .catch((e) => {
        res.status(400).json({ err: e.message });
      });
  },
  courseWithdraw = async (req, res) => {
    const { email, code } = req.body,
      id = await getUserID(email);
    dbo
      .courseWithdraw(id, code)
      .then(() => {
        res.status(200).json({ msg: "Course withdrawn" });
      })
      .catch((e) => {
        res.status(400).json({ err: e.message });
      });
  };

module.exports = {
  courseGetAll,
  courseEnroll,
  courseSelect,
  courseGetMine,
  courseWithdraw,
};
