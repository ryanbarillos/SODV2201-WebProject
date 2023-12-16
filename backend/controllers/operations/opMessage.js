const config = require("../../database/dbconfig"),
  sql = require("mssql");


msgSubmit = async (sID, sMsg) => {
  await sql.connect(config).then(pool => {
    return pool.request()
      .input("sID", sql.Int, sID)
      .input("sMsg", sql.NVarChar(280), sMsg).
      execute("MsgSubmit");
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = {
  // msgGetAll,
  msgSubmit
};
