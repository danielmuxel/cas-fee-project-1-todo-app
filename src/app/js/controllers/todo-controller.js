/* global Handlebars */ // so eslint doesn't complain about it being undefined
import {
  getTodos,
  getTodo,
  deleteTodo,
  addTodo,
  updateTodo,
} from "../services/todo-service.js";
import todoStore from "../services/data/todo-store.js";

const todoContainerElement = document.querySelector(".todo-container");
const todoTemplateElement = document.querySelector("#todo-template");
const resetStoreElement = document.querySelector("#reset-store");

const newTodoElement = document.querySelector("#new-todo");
const todoDialogElement = document.querySelector("#todo-dialog");
const todoFormElement = document.querySelector("#todo-form");
const todoDialogCloseElement = document.querySelector("#todo-dialog #close-dialog");

async function renderTodos() {
  const todos = await getTodos();

  // Fetch the template from the DOM
  const source = todoTemplateElement.innerHTML;

  // Compile the template
  const template = Handlebars.compile(source);

  // Generate the HTML
  const html = template({ todos });

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
      console.log("edit");

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
      await updateTodo(todo);

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
  newTodoElement.addEventListener("click", () => {
    // Open the dialog
    todoDialogElement.showModal();

    // Clear the form
    todoFormElement.reset();
  });

  // create the event listener for the todo form submit
  todoFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const todo = Object.fromEntries(formData.entries());

    // convert the id back to a number
    todo.id = Number(todo.id);

    if (todo.finished === "on") {
      todo.finished = true;
    } else {
      todo.finished = false;
    }

    // add or update todo
    if (todo.id) {
      await updateTodo(todo);
    } else {
      await addTodo(todo);
    }

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
};

async function initializeTodoController() {
  // render the todo list
  await renderTodos();

  // attach event listeners to the buttons
  attachEventListeners();
}

export default initializeTodoController;
