const config = {
  user: process.env.NAME,
  password: process.env.PASS,
  server: process.env.SRVR,
  database: process.env.DBSE,
  driver: process.env.DRVR,
  //   parseJSON: false,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

module.exports = config;
