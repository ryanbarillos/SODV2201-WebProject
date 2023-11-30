import account from "./credentials.js";

const express = require("express"),
  app = express(),
  port = 4000,
  // account = require("../env"),
  mongoose = require("mongoose");

app.get("/", (request, response) => {
  response.send("Hi");
});

app.listen(port, () => {
  console.log(account.name);
});

// mongoose
//   .connect(
//     `mongodb+srv://${account.user}:${account.pass}@webproject.xe9schq.mongodb.net/`
//   )
//   .then(() => {
//     console.log("MonkeyDB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
