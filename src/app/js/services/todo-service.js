import todoStore from "./data/todo-store.js"
import http from "../utils/http.js";

const todoApiUrl = "http://localhost:3000/api/todos";
const delay = 50;

const getTodos = async (filter, sort) => {
  // add params to url for filter or sort
  // filter needs to be an object with key value pairs
  // sort needs to be an object with key value pairs
  // example: filter = { finished: true } or sort = { dueDate: 1 } or sort = { importance: -1 } - sort -1 is descending, 1 is ascending

  // to know what type of param a filter or sort is we need to add a prefix

  // filter: f_ - example: f_finished=true
  // sort: s_ - example: s_dueDate=1

  const params = new URLSearchParams();
  if (filter) {
    Object.keys(filter).forEach((key) => {
      params.append(`f_${key}`, filter[key]);
    });
  }

  if (sort) {
    Object.keys(sort).forEach((key) => {
      params.append(`s_${key}`, sort[key]);
    });
  }

  const url = `${todoApiUrl}?${params.toString()}`;
  console.log("url", url);

  const response = await fetch(url);
  const todos = await response.json();
  return todos;
};

const getTodo = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(todoStore.get().find((todo) => todo.id === Number(id)));
    }, delay);
  });

// combine add or update and check if the id is set, if not add, if yes update
const addOrUpdateTodo = async (todo) => {
  if (todo.id) {
    return await updateTodo(todo.id, todo);
  } else {
    return await addTodo(todo);
  }
};

const addTodo = async (todo) => {
  const response = await fetch(todoApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await response.json();
  return newTodo;
};

const updateTodo = (id, todo) =>
  new Promise((resolve) => {
    setTimeout(() => {
      todoStore.update(id, todo);
      resolve(todoStore.get());
    }, delay);
  });

const deleteTodo = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      todoStore.delete(id);
      resolve(todoStore.get());
    }, delay);
  });

export { getTodos, getTodo, addTodo, updateTodo, addOrUpdateTodo, deleteTodo };
