const config = require("../../database/dbconfig"),
  sql = require("mssql");

// course add
cAdd = async (aID, cName, cCode, cTerm) => {
  const pool = await sql.connect(config);
  // Invoke anonymous function
  try {
    (async () => {
      await pool
        .request()
        .input("aID", sql.Int, aID)
        .input("cName", sql.NVarChar(255), cName)
        .input("cCode", sql.NVarChar(7), cCode)
        .input("cTerm", sql.Int, cTerm)
        .execute("cAdd");
      pool.close();
    })();
  } catch (err) {
    throw Error(err);
  }
};

// course remove
cDel = async (aID, cCode) => {
  console.log(aID);
  console.log(cCode);
  const pool = await sql.connect(config);
  // Invoke anonymous function
  try {
    (async () => {
      await pool
        .request()
        .input("aID", sql.Int, aID)
        .input("cCode", sql.NVarChar(7), cCode)
        .execute("cDel");
      pool.close();
    })();
  } catch (err) {
    console.log(err);
  }
};

// Get all student lsit
getStdntAll = async (aID) => {
  try {
    const result = await sql.connect(config)
      .then(pool => {
        return pool.request().input("aID", sql.Int, aID).execute("getStdntAll");
      })
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  cAdd,
  cDel,
  getStdntAll
};
