import jwt from 'jsonwebtoken';

export interface UserInterface {
  id: string;
}

export function createToken(payload: UserInterface) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '2h' });
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
