import express from "express";
import TodoController from "./controller.js";

const router = express.Router();

const controller = new TodoController();

router.get("/", controller.handleAllTodos.bind(controller));

router.get("/:id", controller.handleSingleTodo.bind(controller));

router.post("/", controller.handleInsertTodo.bind(controller));

router.delete("/:id", controller.handleRemoveTodo.bind(controller));

export default router;
