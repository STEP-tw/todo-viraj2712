const Todo = require('./todo.js');

class User {
  constructor(userName, password) {
    this.todoSrNo = 1;
    this.userName = userName;
    this.password = password || '';
    this.todos = {};
  }

  getTodo(todoSrNo) {
    return this.todos[todoSrNo];
  }
  getTodoTitle(todoSrNo){
    return this.todos[todoSrNo].title;
  }
  editTodoTitle(todoSrNo, newTitle) {
    return this.getTodo(todoSrNo).editTitle(newTitle);
  }
  getTodoDescription(todoSrNo){
    return this.todos[todoSrNo].description;
  }
  editTodoDescription(todoSrNo, newDescription) {
    return this.getTodo(todoSrNo).editDescription(newDescription);
  }
  addTodo(title, description) {
    this.todos[this.todoSrNo] = new Todo(title, description);
    this.increaseSrNo();
  }
  deleteTodo(todoSrNo) {
    delete this.todos[todoSrNo];
  }
  getTask(todoSrNo, taskSrNo) {
    return this.getTodo(todoSrNo).getTask(taskSrNo);
  }
  editTask(todoSrNo, taskSrNo, newTask) {
    this.getTodo(todoSrNo).editTask(taskSrNo, newTask);
  }
  addTask(todoSrNo, task) {
    return this.getTodo(todoSrNo).addTask(task);
  }
  deleteTask(todoSrNo, taskSrNo) {
    this.getTodo(todoSrNo).deleteTask(taskSrNo);
  }
  getTaskStatus(todoSrNo, taskSrNo) {
    return this.getTodo(todoSrNo).getTaskStatus(taskSrNo);
  }
  setTaskStatus(todoSrNo, taskSrNo, status) {
    return this.getTodo(todoSrNo).setTaskStatus(taskSrNo, status);
  }
  getAllTodos() {
    return this.todos;
  }
  getAllTasks(todoSrNo){
    return this.getTodo(todoSrNo).tasks;
  }
  increaseSrNo() {
    this.todoSrNo++;
  }
}

module.exports = User;
