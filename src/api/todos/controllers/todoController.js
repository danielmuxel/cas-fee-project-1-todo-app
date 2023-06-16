/* eslint-disable no-unused-vars */
import * as TodoService from "../services/todoService.js";

export const getAllTodos = (req, res) => {
  // if a query has s_ in front of it, it is a sort query
  // if a query has f_ in front of it, it is a filter query
  const sort = {};
  const filter = {};

  // the query has s_dueDate=1 now we need to remove the s_ and add it to the sort object like this: sort = { dueDate: 1 }

  Object.keys(req.query).forEach((key) => {
    if (key.startsWith("s_")) {
      const sortKey = key.substring(2);
      sort[sortKey] = Number(req.query[key]);
    } else if (key.startsWith("f_")) {
      const filterKey = key.substring(2);
      // parse req.query[key] to boolean if it is a boolean
      let filterValue = req.query[key];

      if (filterValue === "true") filterValue = true;
      else if (filterValue === "false") filterValue = false;

      filter[filterKey] = filterValue;
    }
  });

  TodoService.getAllTodos(filter, sort, (err, todos) => {
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
