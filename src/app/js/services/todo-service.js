import todoStore from "./data/todo-store.js";

const delay = 50;

const getTodos = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(todoStore.get());
    }, delay);
  });

const getTodo = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(todoStore.get().find((todo) => todo.id === Number(id)));
    }, delay);
  });

// combine add or update and check if the id is set, if not add, if yes update
const addOrUpdateTodo = (todo) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (todo.id) {
        todoStore.update(todo);
      } else {
        todoStore.add(todo);
      }
      resolve(todoStore.get());
    }, delay);
  });

const addTodo = (todo) =>
  new Promise((resolve) => {
    setTimeout(() => {
      todoStore.add(todo);
      resolve(todoStore.get());
    }, delay);
  });

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
