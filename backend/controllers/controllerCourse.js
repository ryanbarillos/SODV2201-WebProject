// Requires are treated a functions in array
const dbo = require("./operations/opCourse"),
  { getUserID } = require("./operations/opUser");

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
  courseEnroll = async (req, res) => {
    const studentID = await getUserID(req.params.studentID),
      courseID = req.params.courseID;
    // console.log(studentID, courseID);
    dbo
      .courseEnroll(studentID, courseID)
      .then(() => {
        res.status(200).json({ msg: "Course enrolled" });
      })
      .catch((e) => {
        res.status(400).json({ err: e.message });
      });
  };

module.exports = { courseGetAll, courseEnroll };
