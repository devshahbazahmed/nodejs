import "dotenv/config";
import express from "express";
import authRouter from "./routes/user.routes.js";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async function (req, res, next) {
  try {
    const header = req.headers["authorization"];

    // Header authorization: Bearer <TOKEN>

    if (!header) next();

    if (!header.startsWith("Bearer"))
      return res.status(400).json({
        error: "Authorization header must start with bearer",
      });

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next();
  }
});

app.use("/users", authRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "Server started running",
  });
});

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
