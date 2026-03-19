import express from "express";
const app = express();

const PORT = 8000;

app.use(express.json());

const DIARY = {};
const EMAILS = new Set();

// Hey, here is my car - Please park it and give me back the token
// Email => Unique car number
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (EMAILS.has(email)) {
    return res.status(400).json({ error: `Email already taken` });
  }

  // Create a token for user
  const token = `${Date.now()}`;

  // Do an entry in Diary
  DIARY[token] = { username, email, password };
  EMAILS.add(email);

  return res.status(201).json({ status: "success", token });
});

app.post("/me", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  if (!(token in DIARY)) {
    return res.status(400).json({ error: "Invalid token" });
  }

  const entry = DIARY[token];

  return res.status(201).json({ data: entry });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
