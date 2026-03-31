import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
}

export async function createUser({
  firstName,
  lastName,
  email,
  salt,
  hashedPassword,
}) {
  const [user] = await db
    .insert(usersTable)
    .values({
      firstName,
      lastName,
      email,
      salt,
      password: hashedPassword,
    })
    .returning({ id: usersTable.id });

  return user;
}
