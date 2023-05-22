const todos = [
  {
    id: 1,
    title: "Learn JavaScript",
    description: "Learn JavaScript, it's awesome!",
    dueDate: "2023-06-07",
    importance: 5,
    finished: true,
  },
  {
    id: 2,
    title: "Learn Angular",
    description: "Learn Angular, it's awesome!",
    dueDate: "2023-06-07",
    importance: 1,
    finished: false,
  },
  {
    id: 3,
    title: "Learn React",
    description: "Learn React, it's awesome!",
    dueDate: "2023-06-07",
    importance: 1,
    finished: false,
  },
  {
    id: 4,
    title: "Learn Node",
    description: "Learn Node, it's awesome!",
    dueDate: "2023-06-07",
    importance: 4,
    finished: false,
  },
  {
    id: 5,
    title: "Learn Express",
    description: "Learn Express, it's awesome!",
    dueDate: "2023-06-07",
    importance: 3,
    finished: false,
  },
  {
    id: 6,
    title: "Learn MongoDB",
    description: "Learn MongoDB, it's awesome!",
    dueDate: "2023-06-07",
    importance: 1,
    finished: false,
  },
  {
    id: 7,
    title: "Learn MySQL",
    description: "Learn MySQL, it's awesome!",
    dueDate: "2023-06-07",
    importance: 2,
    finished: false,
  },
  {
    id: 8,
    title: "Learn PHP",
    description: "Urgh... PHP...",
    dueDate: "2023-06-07",
    importance: 1,
    finished: false,
  },
];

const delay = 50;

const getTodos = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(todos);
    }, delay);
  });

const createTodo = (todo) =>
  new Promise((resolve) => {
    setTimeout(() => {
      todos.push(todo);
      resolve(todos);
    }, delay);
  });

const deleteTodo = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const index = todos.findIndex((todo) => todo.id === id);
      todos.splice(index, 1);
      resolve(todos);
    }, delay);
  });

const updateTodo = (id, todo) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const index = todos.findIndex((t) => t.id === id);
      todos[index] = todo;
      resolve(todos);
    }, delay);
  });

export { getTodos, createTodo, deleteTodo, updateTodo };
