/*
  Reference(s) to Connect to MongoDB given 
  https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
  https://stackoverflow.com/questions/69436274/nodejs-cannot-connect-to-mongodb

  REFERENCE(s) for SQL Server
  https://stackoverflow.com/questions/60226370/certificate-error-when-connecting-to-sql-server
  https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage
*/

// Prerequisites
require("dotenv").config();
const express = require("express"),
  sql = require("mssql"),
  cors = require("cors"),
  app = express(),
  config = {
    server: process.env.SRVR,
    user: process.env.NAME,
    password: process.env.PASS,
    database: process.env.DBSE,
    driver: process.env.DRVR,
    options: {
      trustedConnection: true,
      trustServerCertificate: true,
    },
  };

// Connect to Database
let pool;
async function initialize() {
  try {
    pool = await sql.connect(config);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

initialize();
