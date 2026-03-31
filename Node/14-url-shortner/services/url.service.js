import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { eq, and } from "drizzle-orm";

export async function shortenUrl({ url, shortCode, userId }) {
  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetURL: url,
      userId,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return result;
}

export async function getCodes({ userId }) {
  const codes = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, userId));

  return codes;
}

export async function deleteUrl(id, userId) {
  const result = await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, userId)));

  return result;
}

export async function getTargetUrl(code) {
  const [result] = await db
    .select({
      targetURL: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

  return result;
}
