import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar("username", { length: 45 }).notNull(),
  email: varchar("email", { length: 322 }).notNull().unique(),
  password: text("password").notNull(),
  salt: text("salt").notNull(),
});

export const userSessions = pgTable("sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
