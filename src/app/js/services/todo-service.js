import todoStore from "./data/todo-store.js";

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

  console.log("todo-service.getTodos", filter, sort);

  const params = new URLSearchParams();
  if (filter) {
    // add filter params as f_key=value - example: f_finished=true
    Object.keys(filter).forEach((key) => {
      params.append(`f_${key}`, filter[key]);
    });
  }

  if (sort) {
    // add sort params as s_key=value - example: s_dueDate=1
    Object.keys(sort).forEach((key) => {
      params.append(`s_${key}`, sort[key]);
    });
  }

  console.log(params.toString());

  const url = `${todoApiUrl}?${params.toString()}`;

  console.log(url);

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

// combine add or update and check if the id is set, if not add, if yes update
const addOrUpdateTodo = async (todo) => {
  if (todo.id) {
    return updateTodo(todo.id, todo);
  }
  return addTodo(todo);
};

const deleteTodo = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      todoStore.delete(id);
      resolve(todoStore.get());
    }, delay);
  });

const addMockData = () => {
  const mockdata = todoStore.mockData;

  // mockdata.forEach((todo) => {
  //   const newTodo = { ...todo };
  //   delete newTodo.id;
  //   addTodo(newTodo);
  // });
  // the above code but with a for loop to increase the newTodo.dueDate by 1 day for each todo
  for (let i = 0; i < mockdata.length; i++) {
    const todo = mockdata[i];
    const newTodo = { ...todo };
    delete newTodo.id;
    newTodo.dueDate = new Date(
      new Date(newTodo.dueDate).getTime() + i * 24 * 60 * 60 * 1000
    ).toISOString();
    addTodo(newTodo);
  }
};

export {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  addOrUpdateTodo,
  deleteTodo,
  addMockData,
};
