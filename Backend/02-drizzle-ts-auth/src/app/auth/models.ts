import { z } from 'zod';

export const signupPayloadModel = z.object({
  firstName: z.string().min(6).max(255),
  lastName: z.string().min(6).max(255).nullable().optional(),
  email: z.email(),
  password: z.string().min(6).max(50),
});

export const signinPayloadModel = z.object({
  email: z.email(),
  password: z.string().min(6).max(50),
});
