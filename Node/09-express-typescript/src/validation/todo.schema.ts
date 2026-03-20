import { z } from "zod";

export const todoValidationSchema = z.object({
  id: z.string().describe("ID of the todo"),
  title: z.string().describe("title of the todo"),
  description: z.string().describe("description of the todo"),
  isCompleted: z
    .boolean()
    .default(false)
    .describe("if todo is completed or not"),
});

export type Todo = z.infer<typeof todoValidationSchema>;
