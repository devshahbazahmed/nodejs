import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validation/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function createUserToken(payload) {
  const payloadValidationResult = await userTokenSchema.safeParseAsync(payload);

  if (payloadValidationResult.error)
    throw new Error(payloadValidationResult.error.issues);

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

export function validateUserToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}
