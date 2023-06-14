/* eslint-disable no-unused-vars */
import * as TodoService from "../services/todoService.js";

export const getAllTodos = (req, res) => {
  const query = req.query || {};
  TodoService.getAllTodos(query, (err, todos) => {
    if (err) res.status(500).send(err);
    else res.json(todos);
  });
};

export const getTodoById = (req, res) => {
  TodoService.getTodoById(req.params.id, (err, todo) => {
    if (err) res.status(500).send(err);
    else res.json(todo);
  });
};

export const addTodo = (req, res) => {
  const todo = req.body;
  TodoService.addTodo(todo, (err, newTodo) => {
    if (err) res.status(500).send(err);
    else res.json(newTodo);
  });
};

export const updateTodo = (req, res) => {
  const todo = req.body;
  const options = { returnUpdatedDocs: true };
  TodoService.updateTodo(
    req.params.id,
    todo,
    options,
    (err, numAffected, affectedDocuments, upsert) => {
      if (err) res.status(500).send(err);
      else res.json(affectedDocuments);
    }
  );
};

export const deleteTodo = (req, res) => {
  TodoService.deleteTodo(req.params.id, (err, numRemoved) => {
    if (err) res.status(500).send(err);
    else res.json({ success: true });
  });
};
