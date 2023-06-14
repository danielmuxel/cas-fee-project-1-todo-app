/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import assert from 'assert';

const baseUrl = 'http://localhost:3000/api/todos';

let todoId;

async function testTodos() {
  try {
    // Test POST /api/todos
    const newTodo = {
      title: "Learn JavaScript",
      description: "Learn JavaScript, it's awesome!",
      dueDate: "2023-06-07",
      importance: 5,
      finished: true
    };

    let res = await axios.post(baseUrl, newTodo);
    assert.equal(res.status, 200);
    assert.equal(res.data.title, newTodo.title);
    assert.equal(res.data.description, newTodo.description);
    assert.equal(res.data.dueDate, newTodo.dueDate);
    assert.equal(res.data.importance, newTodo.importance);
    assert.equal(res.data.finished, newTodo.finished);
    todoId = res.data._id; // Save the id for the next tests

    // Test GET /api/todos/:id
    res = await axios.get(`${baseUrl}/${todoId}`);
    assert.equal(res.status, 200);
    assert.equal(res.data._id, todoId);
    assert.equal(res.data.title, newTodo.title);
    assert.equal(res.data.description, newTodo.description);
    assert.equal(res.data.dueDate, newTodo.dueDate);
    assert.equal(res.data.importance, newTodo.importance);
    assert.equal(res.data.finished, newTodo.finished);

    // Test PUT /api/todos/:id
    const updatedTodo = {
      title: "Learn JavaScript Updated",
      description: "Learn JavaScript, it's even more awesome!",
      dueDate: "2023-06-08",
      importance: 6,
      finished: false
    };

    res = await axios.put(`${baseUrl}/${todoId}`, updatedTodo);
    assert.equal(res.status, 200);
    assert.equal(res.data.title, updatedTodo.title);
    assert.equal(res.data.description, updatedTodo.description);
    assert.equal(res.data.dueDate, updatedTodo.dueDate);
    assert.equal(res.data.importance, updatedTodo.importance);
    assert.equal(res.data.finished, updatedTodo.finished);

    // Test DELETE /api/todos/:id
    res = await axios.delete(`${baseUrl}/${todoId}`);
    assert.equal(res.status, 200);
    assert(res.data.success);
    console.log('All tests passed!');

  } catch (error) {
    console.error(error);
  }
}

testTodos();
