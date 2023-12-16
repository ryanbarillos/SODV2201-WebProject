/*
  Microsoft SQL Server
  Server Configuration

  To get server name for "server" property:
  https://stackoverflow.com/questions/52110716/how-to-know-my-server-name-in-sql-server
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
module.exports = config;
