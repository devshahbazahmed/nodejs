import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default config = defineConfig({
  out: "./drizzle",
  schema: "./db/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
