import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser)
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists` });

  const salt = randomBytes(32).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      username,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: usersTable.id });

  return res
    .status(201)
    .json({ message: "User created successfully", data: { userId: user.id } });
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user)
    return res
      .status(404)
      .json({ error: `User with email ${email} not found` });

  const salt = user.salt;
  const hash = createHmac("sha256", salt).update(password).digest("hex");

  if (user.password !== hash)
    return res.status(400).json({
      error: "Invalid credentials",
    });

  const payload = {
    id: user.id,
    useranme: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.status(201).json({
    message: "User logged in successfully",
    token,
  });
});

authRouter.get("/", async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "You are not logged in" });

  return res.json({ user });
});

authRouter.patch("/", async (req, res) => {
  const user = req.user;

  if (!user) return res.status(401).json({ error: "You are not logged in" });

  const { username } = req.body;

  await db
    .update(usersTable)
    .set({ username })
    .where(eq(usersTable.id, user.id));

  return res.json({ message: "Username updated successfully" });
});

export default authRouter;
