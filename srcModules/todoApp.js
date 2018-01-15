const User = require('../srcModules/user.js');

class App {
  constructor() {
    this.users = {};
  }

  getUser(userName){
    return this.users[userName];
  }
  addUser(userName,password){
    this.users[userName] = new User(userName,password);
  }
  getTodo(userName,todoSrNo){
    return this.users[userName].getTodo(todoSrNo);
  }
  getTodoTitle(userName,todoSrNo){
    return this.getTodo(userName,todoSrNo).getTodoTitle(todoSrNo);
  }
  editTodoTitle(userName,todoSrNo,newTitle){
    return this.getTodo(userName,todoSrNo).editTodoTitle(todoSrNo,newTitle);
  }
  getTodoDescription(userName,todoSrNo){
    return this.getTodo(userName,todoSrNo).getTodoDescription(todoSrNo);
  }
  editTodoDescription(userName,todoSrNo,newDescription){
    let todo = this.getTodo(userName,todoSrNo);
    return todo.editTodoDescription(todoSrNo,newDescription);
  }
  addTodo(userName,title, description) {
    this.getUser(userName).addTodo(title,userName);
  }
  deleteTodo(userName,todoSrNo) {
    delete this.getUser(userName).todos[todoSrNo];
  }
  getTask(userName,todoSrNo,taskSrNo){
    return this.getUser(userName).getTask(todoSrNo,taskSrNo);
  }
  editTask(userName,todoSrNo,taskSrNo,newTask){
    return this.getUser(userName).editTask(todoSrNo,taskSrNo,newTask);
  }
  addTask(userName,todoSrNo,taskSrNo){
    return this.getUser(userName).addTask(todoSrNo,taskSrNo);
  }
  deleteTask(userName,todoSrNo,taskSrNo){
    this.getUser(userName).deleteTask(todoSrNo,taskSrNo);
  }
  getTaskStatus(userName,todoSrNo,taskSrNo){
    return this.getUser(userName).getTaskStatus(todoSrNo,taskSrNo);
  }
  setTaskStatus(userName,todoSrNo,taskSrNo,status){
    return this.getUser(userName).getTaskStatus(todoSrNo,taskSrNo,status);
  }
  getAllTodos(userName){
    return this.getUser(userName).getAllTodos();
  }
  getAllTasks(userName,todoSrNo){
    return this.getUser(userName).getAllTasks(todoSrNo);
  }
}

module.exports = App;
