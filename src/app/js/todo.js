/* global Handlebars */
import { getTodos, deleteTodo } from "./todo-service.js";

const todoListElement = document.querySelector("#todo-list");

async function renderTodos() {
  const todos = await getTodos();

  // Fetch the template from the DOM
  const source = document.querySelector("#todo-template").innerHTML;

  // Compile the template
  const template = Handlebars.compile(source);

  // Generate the HTML
  const html = template({ todos });

  // Add the HTML to the DOM
  todoListElement.innerHTML = html;
}

const attachEventListeners = () => {
  // create the event listener for the delete buttons on the todo items list
  todoListElement.addEventListener("click", async (event) => {
    // if the clicked element is not a delete button, then return early
    if (!event.target.classList.contains("delete")) {
      return;
    }

    // get the id of the todo item to delete
    const id = event.target.dataset.todoId;

    // delete the todo item
    await deleteTodo(id);

    // re-render the todo list
    await renderTodos();
  });
};

async function initializeTodoList() {
  // render the todo list
  await renderTodos();

  // attach event listeners to the buttons
  attachEventListeners();
}

export default initializeTodoList;
