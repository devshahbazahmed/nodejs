import type { Request, Response } from "express";
import {
  todoValidationSchema,
  type Todo,
} from "../../validation/todo.schema.js";

class TodoController {
  private _db: Todo[];

  constructor() {
    this._db = [];
  }

  public handleAllTodos(req: Request, res: Response) {
    const todos = this._db;
    return res.status(200).json(todos);
  }

  public handleSingleTodo(req: Request, res: Response) {
    const id = req.params.id;
    const todo = this._db.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    return res.status(200).json(todo);
  }

  public async handleInsertTodo(req: Request, res: Response) {
    try {
      const unvalidatedData = req.body;
      const validatedData =
        await todoValidationSchema.parseAsync(unvalidatedData);
      this._db.push(validatedData);
      return res.status(201).json({ todo: validatedData });
    } catch (error) {
      console.error(error);
    }
  }

  public handleRemoveTodo(req: Request, res: Response) {
    const id = req.params.id;
    const todoIndex = this._db.findIndex((todo) => todo.id === id);
    if (todoIndex < 1) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    this._db.splice(todoIndex, 1);

    return res.status(200).json({ message: "Todo deleted successfully" });
  }
}

export default TodoController;
