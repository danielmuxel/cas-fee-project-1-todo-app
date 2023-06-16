import {
  getTodos,
  getTodo,
  deleteTodo,
  addOrUpdateTodo,
} from "../services/todo-service.js";
import todoStore from "../services/data/todo-store.js"; // only used to reset the store for debugging

const todoContainerElement = document.querySelector(".todo-container");
const todoTemplateElement = document.querySelector("#todo-template");
const resetStoreElement = document.querySelector("#reset-store");
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
  const todos = await getTodos({}, { dueDate: 1 });

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
      todoFormElement.elements.id.value = todo.id;
      todoFormElement.elements.title.value = todo.title;
      todoFormElement.elements.description.value = todo.description;
      todoFormElement.elements.dueDate.value = todo.dueDate;
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

  // create the event listener for the reset store button
  resetStoreElement.addEventListener("click", async () => {
    // reset the local storage
    todoStore.resetStore();

    // re-render the todo list
    await renderTodos();
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

    console.log("do something");

    // get the sort order from the data-sort-order attribute
    sort.order = event.target.dataset.sortOrder;

    // re-render the todo list
    await renderTodos(sort);
  });
};

async function initializeTodoController() {
  // render the todo list
  await renderTodos();

  // attach event listeners to the buttons
  attachEventListeners();
}

export default initializeTodoController;
