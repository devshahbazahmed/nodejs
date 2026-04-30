import type { Request, Response } from 'express';
import { signupPayloadSchema, signinPayloadSchema } from './models.js';
import db from '../../db/index.js';
import { usersTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { createHmac, randomBytes } from 'node:crypto';
import { createToken, type UserTokenPayload } from './utils/token.js';

class AuthenticationController {
  public async handleSignup(req: Request, res: Response) {
    const validationResult = await signupPayloadSchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: 'Body validation failed',
        error: validationResult.error.issues,
      });
    }

    const { firstName, lastName, email, password } = validationResult.data;

    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser) {
      return res.status(409).json({
        message: `User with email ${email} already exists`,
        error: 'duplicate entry',
      });
    }

    const salt = randomBytes(32).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    const [userResult] = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: usersTable.id });

    if (!userResult) {
      return res.status(400).json({
        message: 'User not created',
        error: 'Error in creating the user',
      });
    }

    return res.status(201).json({
      message: 'User created successfully',
      data: { id: userResult.id },
    });
  }

  public async handleSignin(req: Request, res: Response) {
    const validationResult = await signinPayloadSchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: 'Body validation failed',
        error: validationResult.error.issues,
      });
    }

    const { email, password } = validationResult.data;

    const [userResult] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!userResult) {
      return res.status(400).json({
        message: `User with email ${email} does not exist`,
      });
    }

    const newSalt = userResult.salt;
    const hashedPassword = createHmac('sha256', newSalt as string)
      .update(password)
      .digest('hex');

    if (hashedPassword !== userResult.password) {
      return res.status(401).json({
        message: 'Invalid Credentials',
      });
    }

    const token = createToken({ id: userResult.id });

    return res.status(200).json({
      message: 'User logged in successfully',
      token,
    });
  }

  public async handleMe(req: Request, res: Response) {
    // @ts-ignore
    const { id } = req.user as UserTokenPayload;

    const [userResult] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return res.status(200).json({
      firstName: userResult?.firstName,
      lastName: userResult?.lastName,
      email: userResult?.email,
    });
  }
}

export default AuthenticationController;
