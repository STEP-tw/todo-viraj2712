const User = require('./user.js');

class App {
  constructor() {
    this.users = {};
  }

  getUser(userName) {
    return this.users[userName];
  }
  addUser(userName) {
    this.users[userName] = new User(userName);
  }
  getTodo(userName, todoID) {
    return this.getUser(userName).getTodo(todoID);
  }
  getTodoTitle(userName, todoID) {
    return this.getUser(userName).getTodoTitle(todoID);
  }
  editTodoTitle(userName, todoID, newTitle) {
    return this.getUser(userName).editTodoTitle(todoID, newTitle);
  }
  getTodoDescription(userName, todoID) {
    return this.getUser(userName).getTodoDescription(todoID);
  }
  editTodoDescription(userName, todoID, newDescription) {
    let todo = this.getUser(userName);
    return todo.editTodoDescription(todoID, newDescription);
  }
  addTodo(userName, title, description) {
    this.getUser(userName).addTodo(title, description);
  }
  deleteTodo(userName, todoID) {
    this.getUser(userName).deleteTodo(todoID);
  }
  getTask(userName, todoID, taskID) {
    return this.getUser(userName).getTask(todoID, taskID);
  }
  editTask(userName, todoID, taskID, newTask, status) {
    this.setTaskStatus(userName, todoID, taskID, status);
    return this.getUser(userName).editTask(todoID, taskID, newTask);
  }
  addTask(userName, todoID, taskTitle, taskStatus) {
    return this.getUser(userName).addTask(todoID, taskTitle, taskStatus);
  }
  deleteTask(userName, todoID, taskID) {
    this.getUser(userName).deleteTask(todoID, taskID);
  }
  getTaskStatus(userName, todoID, taskID) {
    return this.getUser(userName).getTaskStatus(todoID, taskID);
  }
  setTaskStatus(userName, todoID, taskID, status) {
    return this.getUser(userName).setTaskStatus(todoID, taskID, status);
  }
  getTodoID(userName) {
    return this.getUser(userName).getTodoID();
  }
  setTodoIDs(userName){
    this.getUser(userName).setTodoIDs();
  }
  getAllTodos(userName) {
    return this.getUser(userName).getAllTodos();
  }
  getAllTasks(userName, todoID) {
    return this.getUser(userName).getAllTasks(todoID);
  }
  retrive(newUser, appData) {
    let self = this;
    let users = Object.keys(appData);
    users.forEach(function(user) {
      let currentUser = appData[user];
      let todoIDs = Object.keys(currentUser);
      todoIDs.forEach(function(todoID) {
        let todo = currentUser[todoID];
        newUser.addTodo(todo.title, todo.description);
        let currentTasks = todo.tasks;
        let taskIDs = Object.keys(currentTasks);
        taskIDs.forEach(function(taskID) {
          let task = currentTasks[taskID];
          newUser.addTask(todoID, task.title, task.status);
        })
      })
    })
  }
}

module.exports = App;
