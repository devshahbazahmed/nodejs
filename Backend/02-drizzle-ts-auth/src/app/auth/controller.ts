import type { Request, Response } from 'express';
import { signinPayloadModel, signupPayloadModel } from './models.js';
import db from '../../db/index.js';
import { usersTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { createHmac, randomBytes } from 'node:crypto';
import { createToken, type UserInterface } from './utils/token.js';

class AuthenticationController {
  public async handleSignup(req: Request, res: Response) {
    const validationResult = await signupPayloadModel.safeParseAsync(req.body);

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
      return res.status(400).json({
        message: `User with email ${email} already exists`,
        error: 'duplicate entry',
      });
    }

    const salt = randomBytes(32).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    const [user] = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: usersTable.id });

    return res.status(201).json({
      message: 'User created successfully',
      data: { id: user?.id },
    });
  }

  public async handleSignin(req: Request, res: Response) {
    const validationResult = await signinPayloadModel.safeParseAsync(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: 'Body validation failed',
        error: validationResult.error.issues,
      });
    }

    const { email, password } = validationResult.data;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return res.status(400).json({
        message: `User with email ${email} already exists`,
      });
    }

    const salt = randomBytes(32).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    if (hashedPassword !== user?.password) {
      return res.status(400).json({
        message: 'Invalid credentials',
        error: 'password incorrect',
      });
    }

    const token = createToken({ id: user.id });

    return res.status(200).json({
      message: 'Sign in success',
      data: { token },
    });
  }

  public async handleMe(req: Request, res: Response) {
    // @ts-ignore
    const { id } = req.user! as UserInterface;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return res.status(200).json({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });
  }
}

export default AuthenticationController;
