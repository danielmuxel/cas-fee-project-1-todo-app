import {
  getTodos,
  getTodo,
  deleteTodo,
  addOrUpdateTodo,
} from "../services/todo-service.js";

const todoContainerElement = document.querySelector(".todo-container");
const todoTemplateElement = document.querySelector("#todo-template");
// Get the template from the DOM
const todoTemplateSource = todoTemplateElement.innerHTML;
// Compile the template
const todoCompiledTemplate = Handlebars.compile(todoTemplateSource);

const newTodoButtonElement = document.querySelector("#new-todo-button");
const todoDialogElement = document.querySelector("#todo-dialog");
const todoFormElement = document.querySelector("#todo-form");
const todoDialogCloseElement = document.querySelector(
  "#todo-dialog #close-dialog"
);

const todoSortActionsElement = document.querySelector("#todo-sort-actions");
let sort = {
  dueDate: 1,
};

const todoFilterActionsElement = document.querySelector("#todo-filter-actions");
let filter = {};

// add a helper to handlebars to format the date
Handlebars.registerHelper("formatDate", (date) => {
  // format the date to be human readable (e.g. 2021-06-07 to 07.06.2021)
  const dateObject = new Date(date);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear();
  return `${day}.${month}.${year}`;
});

async function renderTodos() {
  const todos = await getTodos(filter, sort);

  // Generate the HTML
  const html = todoCompiledTemplate({ todos });

  // Add the HTML to the DOM
  todoContainerElement.innerHTML = html;
}

const attachEventListeners = () => {
  // create the event listener for the delete buttons on the todo items list
  todoContainerElement.addEventListener("click", async (event) => {
    // if the clicked element is not a todo action then return early
    // todo actions have data-todo-action
    if (!event.target.dataset.todoAction) {
      return;
    }

    // if the action is delete
    if (event.target.dataset.todoAction === "delete") {
      // get the id from the data-todo-id attribute
      const id = event.target.dataset.todoId;

      // delete the todo item
      await deleteTodo(id);

      // re-render the todo list
      await renderTodos();
    }

    // if the action is edit
    if (event.target.dataset.todoAction === "edit") {
      // get the id from the data-todo-id attribute
      const id = event.target.dataset.todoId;

      // get the todo item
      const todo = await getTodo(id);

      // Fill the form with the todo data
      todoFormElement.elements.id.value = id;
      todoFormElement.elements.title.value = todo.title;
      todoFormElement.elements.description.value = todo.description;
      // get the date from the todo item and convert it to a date object and format it like the input expects it (e.g. 2021-06-07)
      todoFormElement.elements.dueDate.value = new Date(todo.dueDate)
        .toISOString()
        .split("T")[0]
        .toString();
      todoFormElement.elements.importance.value = todo.importance;
      todoFormElement.elements.finished.checked = todo.finished;

      // Open the dialog
      todoDialogElement.showModal();
    }

    // if the action is the toggle-finish checkbox
    if (event.target.dataset.todoAction === "toggle-finish") {
      // get the id from the data-todo-id attribute
      const id = event.target.dataset.todoId;

      // get the todo item
      const todo = await getTodo(id);

      // toggle the finished property
      todo.finished = !todo.finished;

      // update the todo item
      await addOrUpdateTodo(todo);

      // re-render the todo list
      await renderTodos();
    }
  });

  // create the event listener for the new todo button
  newTodoButtonElement.addEventListener("click", () => {
    // Clear the form
    todoFormElement.reset();

    // Open the dialog
    todoDialogElement.showModal();
  });

  // create the event listener for the todo form submit
  todoFormElement.addEventListener("submit", async (event) => {

    event.preventDefault(); // prevent the default form submit behavior, so it doesn't reload the page

    const formData = new FormData(event.target);
    const todo = Object.fromEntries(formData.entries());

    // transform the .id prop to _id
    if (todo.id) {
      // eslint-disable-next-line no-underscore-dangle
      todo._id = todo.id;
      delete todo.id;
    }

    if (todo.finished === "on") {
      todo.finished = true;
    } else {
      todo.finished = false;
    }

    // add or update todo
    await addOrUpdateTodo(todo);

    // Close the dialog
    todoDialogElement.close();

    // re-render the todo list
    await renderTodos();
  });

  // create the event listener for the todo dialog close button
  todoDialogCloseElement.addEventListener("click", () => {
    // Close the dialog
    todoDialogElement.close();
  });

  todoSortActionsElement.addEventListener("click", async (event) => {
    // if the clicked element is not a sort action then return early
    // sort actions have data-sort-order
    if (!event.target.dataset.sortKey) {
      return;
    }

    // get the sort key from the data-sort-key attribute
    const key = event.target.dataset.sortKey;

    // if the sort key is the same as the previous one, then toggle the order
    if (sort[key] !== undefined) {
      sort[key] *= -1;
    } else {
      // reset the sort object
      sort = {};
      // set the sort key to 1
      sort[key] = 1;
    }

    // re-render the todo list
    await renderTodos();
  });
};

todoFilterActionsElement.addEventListener("click", async (event) => {
  // if the clicked element is not a filter action then return early
  // filter actions have data-filter-key
  if (!event.target.dataset.filterKey) {
    return;
  }

  // get the filter key from the data-filter-key attribute
  const key = event.target.dataset.filterKey;

  // reset the filter object
  filter = {};

  // if the filter is all, then return early (no need to set the filter object) and re-render the todo list
  if (key === "all") {
    // re-render the todo list
    await renderTodos();
    return;
  }

  // if the filter is finished, then set the filter object to { finished: true }
  if (key === "finished") {
    filter.finished = true;
  }

  // if the filter is pending, then set the filter object to { finished: false }
  if (key === "pending") {
    filter.finished = false;
  }

  // re-render the todo list
  await renderTodos();
});

async function initializeTodoController() {
  // render the todo list
  await renderTodos();

  // attach event listeners to the buttons
  attachEventListeners();
}

export default initializeTodoController;
