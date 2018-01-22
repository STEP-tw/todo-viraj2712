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
  getTodo(userName, todoSrNo) {
    return this.getUser(userName).getTodo(todoSrNo);
  }
  getTodoTitle(userName, todoSrNo) {
    return this.getUser(userName).getTodoTitle(todoSrNo);
  }
  editTodoTitle(userName, todoSrNo, newTitle) {
    return this.getUser(userName).editTodoTitle(todoSrNo, newTitle);
  }
  getTodoDescription(userName, todoSrNo) {
    return this.getUser(userName).getTodoDescription(todoSrNo);
  }
  editTodoDescription(userName, todoSrNo, newDescription) {
    let todo = this.getUser(userName);
    return todo.editTodoDescription(todoSrNo, newDescription);
  }
  addTodo(userName, title, description) {
    this.getUser(userName).addTodo(title, description);
  }
  deleteTodo(userName, todoSrNo) {
    this.getUser(userName).deleteTodo(todoSrNo);
  }
  getTask(userName, todoSrNo, taskSrNo) {
    return this.getUser(userName).getTask(todoSrNo, taskSrNo);
  }
  editTask(userName, todoSrNo, taskSrNo, newTask, status) {
    this.setTaskStatus(userName, todoSrNo, taskSrNo, status);
    return this.getUser(userName).editTask(todoSrNo, taskSrNo, newTask);
  }
  addTask(userName, todoSrNo, taskTitle, taskStatus) {
    return this.getUser(userName).addTask(todoSrNo, taskTitle, taskStatus);
  }
  deleteTask(userName, todoSrNo, taskSrNo) {
    this.getUser(userName).deleteTask(todoSrNo, taskSrNo);
  }
  getTaskStatus(userName, todoSrNo, taskSrNo) {
    return this.getUser(userName).getTaskStatus(todoSrNo, taskSrNo);
  }
  setTaskStatus(userName, todoSrNo, taskSrNo, status) {
    return this.getUser(userName).setTaskStatus(todoSrNo, taskSrNo, status);
  }
  getTodoSrNo(userName) {
    return this.getUser(userName).getTodoSrNo();
  }
  getAllTodos(userName) {
    return this.getUser(userName).getAllTodos();
  }
  getAllTasks(userName, todoSrNo) {
    return this.getUser(userName).getAllTasks(todoSrNo);
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
