const express = require("express"),
  app = express();

app.get("/api", (req, res) => {
  res.json({ usernames: ["Ali", "Mia", "Jay", "Max", "John"] });
});

app.listen(3001, () => {
  console.log("Port 3001");
});
