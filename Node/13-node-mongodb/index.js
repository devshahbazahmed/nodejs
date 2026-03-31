import "dotenv/config";
import express from "express";
import { connectMongoDB } from "./connection.js";
import userRouter from "./routes/user.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authMiddleware);

connectMongoDB(process.env.MONGODB_URL).then(() =>
  console.log("MongoDB connected")
);

app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
