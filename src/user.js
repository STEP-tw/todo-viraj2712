const Todo = require('./todo.js');
const TodoHandler = require('./todoHandler.js');
const todoHandler = new TodoHandler();

class User {
  constructor(userName, password) {
    this.todoSrNo = 1;
    this.userName = userName;
    this.password = password || '';
    this.todos = todoHandler.getTodos(this.userName);
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
    this.setTodos();
    this.increaseSrNo();
  }
  deleteTodo(todoSrNo) {
    delete this.todos[todoSrNo];
    this.setTodos();
  }
  getTask(todoSrNo, taskSrNo) {
    return this.getTodo(todoSrNo).getTask(taskSrNo);
  }
  editTask(todoSrNo, taskSrNo, newTask) {
    this.setTodos();
    return this.getTodo(todoSrNo).editTask(taskSrNo, newTask);
  }
  addTask(todoSrNo, task) {
    this.setTodos();
    return this.getTodo(todoSrNo).addTask(task);
  }
  deleteTask(todoSrNo, taskSrNo) {
    this.setTodos();
    this.getTodo(todoSrNo).deleteTask(taskSrNo);
  }
  getTaskStatus(todoSrNo, taskSrNo) {
    return this.getTodo(todoSrNo).getTaskStatus(taskSrNo);
  }
  setTaskStatus(todoSrNo, taskSrNo, status) {
    this.setTodos();
    return this.getTodo(todoSrNo).setTaskStatus(taskSrNo, status);
  }
  getTodoSrNo(){
    return this.todoSrNo;
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
  setTodos(){
    todoHandler.setTodos(this.userName,this.todos);
    todoHandler.writeTodosToFile();
  }
}

module.exports = User;
