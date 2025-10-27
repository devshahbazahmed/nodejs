require("dotenv/config.js");
const db = require("./db");
const { usersTable } = require("./drizzle/schema.js");



async function getAllUsers() {
  const users = await db.select().from(usersTable);
  console.log(`Users is DB:`, users);
  return users;
}

async function createUser({ id, name, email }) {
  await db.insert(usersTable).values({
    id,
    name,
    email,
  });
}

getAllUsers();

