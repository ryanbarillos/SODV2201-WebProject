// Global Variables
const dbo = [require("./operations/opMessage"), require("./operations/opUser")];

// POST Submit mesages
msgSubmit = async (req, res) => {
  const { email, sMsg } = req.body,
    sID = await dbo[1].getUserID(email);
  dbo[0]
    .msgSubmit(parseInt(sID), sMsg)
    .then(() => {
      res.status(200).json({ msg: "Message submitted" });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ err: e.message });
    });
};

module.exports = { msgSubmit };
