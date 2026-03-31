import "dotenv/config";
import express from "express";
import authRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import { authenticationMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authenticationMiddleware);

app.use("/users", authRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "Server started running",
  });
});

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
