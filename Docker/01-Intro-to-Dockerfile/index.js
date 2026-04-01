import express from "express";

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  return res.json({ message: "Server has started running" });
});

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
