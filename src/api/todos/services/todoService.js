/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import Datastore from "nedb";

const db = new Datastore({ filename: "./db/todos.db", autoload: true });

export const getAllTodos = (filter, sort, callback) => {
  try {
    db.find(filter).sort(sort).exec(callback);
  } catch (error) {
    console.log("error", error.message);
  }
};

export const getTodoById = (id, callback) => {
  try {
    db.findOne({ _id: id }, callback);
  } catch (error) {
    console.log("error", error.message);
  }
};

export const addTodo = (todo, callback) => {
  try {
    db.insert(todo, callback);
  } catch (error) {
    console.log("error", error.message);
  }
};

export const updateTodo = (id, todo, options, callback) => {
  try {
    db.update({ _id: id }, todo, options, callback);
  } catch (error) {
    console.log("error", error.message);
  }
};

export const deleteTodo = (id, callback) => {
  try {
    db.remove({ _id: id }, {}, callback);
  } catch (error) {
    console.log("error", error.message);
  }
};
