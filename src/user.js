const Todo = require('./todo.js');

class User {
  constructor(userName) {
    this.todoID = 1;
    this.userName = userName;
    this.todos = {};
  }

  getTodo(todoID) {
    return this.todos[todoID];
  }
  getTodoTitle(todoID) {
    return this.todos[todoID].title;
  }
  editTodoTitle(todoID, newTitle) {
    return this.getTodo(todoID).editTitle(newTitle);
  }
  getTodoDescription(todoID) {
    return this.todos[todoID].description;
  }
  editTodoDescription(todoID, newDescription) {
    return this.getTodo(todoID).editDescription(newDescription);
  }
  addTodo(title, description) {
    this.todos[this.todoID] = new Todo(title, description);
    this.increaseSrNo();
  }
  deleteTodo(todoID) {
    delete this.todos[todoID];
  }
  getTask(todoID, taskID) {
    return this.getTodo(todoID).getTask(taskID);
  }
  editTask(todoID, taskID, newTask) {
    return this.getTodo(todoID).editTask(taskID, newTask);
  }
  addTask(todoID, task, status) {
    return this.getTodo(todoID).addTask(task, status);
  }
  deleteTask(todoID, taskID) {
    this.getTodo(todoID).deleteTask(taskID);
  }
  getTaskStatus(todoID, taskID) {
    return this.getTodo(todoID).getTaskStatus(taskID);
  }
  setTaskStatus(todoID, taskID, status) {
    return this.getTodo(todoID).setTaskStatus(taskID, status);
  }
  gettodoID() {
    return this.todoID;
  }
  settodoIDs(){
    let todos=this.todos;
    let todoIDs = Object.keys(todos);
    let id = 1;
    todoIDs.forEach(function(todoID){
      todos[id] = todos[todoID];
      id++;
    });
    delete todos[id];
    this.todos=todos;
  }
  getAllTodos() {
    return this.todos;
  }
  getAllTasks(todoID) {
    return this.getTodo(todoID).tasks;
  }
  increaseSrNo() {
    this.todoID++;
  }
}

module.exports = User;
