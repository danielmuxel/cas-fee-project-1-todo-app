import express from "express";
import * as todoController from "../controllers/todoController.js";

const router = express.Router();

router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.addTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
