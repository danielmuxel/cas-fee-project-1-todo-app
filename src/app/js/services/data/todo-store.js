const localStorageKey = "todos-store";

const mockData = [
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

export default {
  mockData,

  get() {
    return JSON.parse(
      localStorage.getItem(localStorageKey) || JSON.stringify(mockData)
    );
  },

  set(todos) {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  },

  add(todo) {
    const todos = this.get();
    todos.unshift({ ...todo, id: todos.length + 1});
    this.set(todos);
  },

  update(todo) {
    const newTodo = { ...todo, id: Number(todo.id) };
    const todos = this.get();
    const index = todos.findIndex((t) => Number(t.id) === Number(todo.id));

    if (index !== -1) {
      todos[index] = newTodo;
      this.set(todos);
    } else {
      console.error(`Todo with ID ${todo.id} not found`); // add toast notification maybe?
    }
  },

  delete(id) {
    const todos = this.get();
    const index = todos.findIndex((t) => Number(t.id) === Number(id));
    if (index !== -1) {
      todos.splice(index, 1);
      this.set(todos);
    } else {
      console.error(`Todo with ID ${id} not found`); // add toast notification maybe?
    }
  },

  // reset store with the key
  resetStore() {
    localStorage.removeItem(localStorageKey);
  },
};
