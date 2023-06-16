// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import Datastore from "nedb";

const db = new Datastore({ filename: "./db/todos.db", autoload: true });

export const getAllTodos = (filter, sort, callback) => {
  console.log("filter", filter);
  console.log("sort", sort);
  
  db.find(filter, callback).sort(sort);
};

export const getTodoById = (id, callback) => {
  db.findOne({ _id: id }, callback);
};

export const addTodo = (todo, callback) => {
  db.insert(todo, callback);
};

export const updateTodo = (id, todo, options, callback) => {
  db.update({ _id: id }, todo, options, callback);
};

export const deleteTodo = (id, callback) => {
  db.remove({ _id: id }, {}, callback);
};
