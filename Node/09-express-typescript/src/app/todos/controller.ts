import type { Request, Response } from "express";
import { todoSchema, type Todo } from "../../validation/todo.schema.js";

class TodoController {
  private _db: Todo[];

  constructor() {
    this._db = [];
  }

  public handleAllTodos(req: Request, res: Response) {
    const todos = this._db;
    return res.json(todos);
  }

  public async handleInsertTodo(req: Request, res: Response) {
    try {
      const unvalidatedData = req.body;
      const validationResult = await todoSchema.parseAsync(unvalidatedData);
      this._db.push(validationResult);
      return res.status(201).json({ todo: validationResult });
    } catch (error) {
      console.error(error);
    }
  }
}

export default TodoController;
