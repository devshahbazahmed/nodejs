import { z } from 'zod';

export const signupPayloadSchema = z.object({
  firstName: z.string().min(4).max(45),
  lastName: z.string().min(4).max(45),
  email: z.email(),
  password: z.string().min(4).max(66),
});

export const signinPayloadSchema = z.object({
  email: z.email(),
  password: z.string().min(3).max(66),
});
