import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import {
  ensureAuthenticated,
  restrictToRole,
} from "../middleware/auth.middleware.js";

const router = express.Router();

const adminRestrictMiddleware = restrictToRole("ADMIN");

router.use(ensureAuthenticated);
router.use(adminRestrictMiddleware);

router.get("/users", async (_, res) => {
  const users = await db
    .select({
      id: usersTable.id,
      username: usersTable.username,
      email: usersTable.email,
    })
    .from(usersTable);

  return res.json({ users });
});

export default router;
