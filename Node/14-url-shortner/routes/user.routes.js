import express from "express";
import {
  loginPostRequestBodySchema,
  signupPostRequestBodySchema,
} from "../validation/request.validation.js";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { createUser, getUserByEmail } from "../services/user.service.js";
import { createUserToken } from "../utils/token.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.issues });
  }

  const { firstName, lastName, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists` });
  }

  const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

  const user = await createUser({
    firstName,
    lastName,
    email,
    salt,
    hashedPassword,
  });

  return res
    .status(201)
    .json({ message: "User created successfully", user: { userId: user.id } });
});

router.post("/login", async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.issues });
  }

  const { email, password } = validationResult.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return res
      .status(404)
      .json({ error: `User with email ${email} not found` });
  }

  const { password: hashedPassword } = hashPasswordWithSalt(
    password,
    user.salt
  );

  if (user.password !== hashedPassword)
    return res.status(400).json({ error: "Invalid credentials" });

  const token = await createUserToken({ id: user.id });

  return res.json({ message: "User logged in successfully", token });
});

export default router;
