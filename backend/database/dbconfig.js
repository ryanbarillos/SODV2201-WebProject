/*
  Microsoft SQL Server
  Server Configuration
*/
const sql = require("mssql"),
  config = {
    user: process.env.NAME,
    password: process.env.PASS,
    server: process.env.SRVR,
    database: process.env.DBSE,
    driver: process.env.DRVR,
    parseJSON: true,
    options: {
      trustedConnection: true,
      trustServerCertificate: true,
    },
  };
// async function connectDB() {
//   try {
//     return await sql.connect(config);
//   } catch (err) {
//     console.error("Connexion failed\n" + err);
//   }
// database.close();  // To end database connection
// }

module.exports = config;
