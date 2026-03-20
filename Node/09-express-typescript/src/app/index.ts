import express, { type Application } from "express";
import todoRouter from "./todos/routes.js";

export function createServerApplication(): Application {
  const app = express();

  app.use(express.json());

  app.use("/todos", todoRouter);

  return app;
}
