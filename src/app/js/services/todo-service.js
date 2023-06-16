const todoApiUrl = "http://localhost:3000/api/todos";

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

  const url = `${todoApiUrl}?${params.toString()}`;

  const response = await fetch(url);
  const todos = await response.json();
  return todos;
};

const getTodo = async (id) => {
  const url = `${todoApiUrl}/${id}`;

  const response = await fetch(url);
  const todo = await response.json();
  return todo;
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

const updateTodo = async (id, todo) => {
  const url = `${todoApiUrl}/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await response.json();
  return updatedTodo;
};

// combine add or update and check if the id is set, if not add, if yes update
const addOrUpdateTodo = async (todo) => {
  // eslint-disable-next-line no-underscore-dangle
  const id = todo._id;
  if (id) {
    return updateTodo(id, todo);
  }
  return addTodo(todo);
};

const deleteTodo = async (id) => {
  const url = `${todoApiUrl}/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });
  const deletedTodo = await response.json();
  return deletedTodo;
};

export { getTodos, getTodo, addTodo, updateTodo, addOrUpdateTodo, deleteTodo };
