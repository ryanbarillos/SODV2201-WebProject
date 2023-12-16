const config = require("../../database/dbconfig"),
  sql = require("mssql");

msgGetAll = async () => {
  try {
    const result = sql.connect(config).then(pool => {
      return pool.request().query("SELECT * FROM StudentMessages");
    }).catch((err) => {
      console.log(err);
    });
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
};

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
  msgGetAll,
  msgSubmit
};
