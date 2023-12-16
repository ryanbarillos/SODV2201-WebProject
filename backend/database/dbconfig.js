/*
  Microsoft SQL Server
  Server Configuration

  "server" requires your Server Name
  https://stackoverflow.com/questions/52110716/how-to-know-my-server-name-in-sql-server

  "user" requires your username for SSMS
  "password" requires your password for SSMS
  "database" is given
  "driver" is given
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
