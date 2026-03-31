import express from "express";
import userRouter from "./routes/user.routes.js";
import { authenticationMiddleware } from "./middleware/auth.middleware.js";

const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticationMiddleware);

app.use("/user", userRouter);

app.get("/", (_, res) => {
  return res.json({ status: "Server is up and running" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
