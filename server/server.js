const express = require("express"),
  app = express(),
  port = 4000,
  mongoose = require("mongoose");

app.get("/", (request, response) => {
  response.send("Hi");
});

app.get("/blog", (request, response) => {
  response.send("Net Ninja");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

mongoose.connnect;
// const express = require("express"),
//   app = express();

// app.get("/api", (req, res) => {
//   res.json({ usernames: ["Ali", "Mia", "Jay", "Max", "John"] });
// });

// app.listen(3001, () => {
//   console.log("Port 3001");
// });
