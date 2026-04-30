import jwt from 'jsonwebtoken';

export interface UserTokenPayload {
  id: string;
}

export function createToken(payload: UserTokenPayload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
}

export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    return payload;
  } catch (error) {
    return null;
  }
}
