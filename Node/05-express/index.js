const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", function (req, res) {
  res.end("HomePage");
});

app.get("/contact-us", function (req, res) {
  res.end("You can contact me at my email address");
});

app.post("/tweets", function (req, res) {
  res.status(201).end("Tweet posted");
});

app.get("/tweets", function (req, res) {
  res.end("Your all tweets");
});

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
