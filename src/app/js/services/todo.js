export default class Todo {
  constructor({ id, title, description, dueDate, importance, finished }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.importance = importance;
    this.finished = finished;
  }
}
