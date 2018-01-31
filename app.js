const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Todo = require('./src/todoApp');
const presentator = require('./lib/presentator');
const lib = require('./lib/utility.js');
const todoApp = new Todo();

const path = './data/data.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

let registered_users = [{
  userName: 'viraj',
  name: 'Viraj Patil'
}, {
  userName: 'salman',
  name: 'Salman Shaik'
}];

let logRequest = (req, res, next) => {
  let text = [
    `${new Date().toLocaleTimeString()}`,
    `${req.method} ${req.url}`,
  ].join('  ');
  console.log(text);
  next();
}

let loadUser = (req, res, next) => {
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u => u.sessionid == sessionid);
  if (sessionid && user) req.user = user;
  next();
}

const setForFailedLogin = (res) => {
  res.set('Set-Cookie', `logInFailed=true; Max-Age=${5}`);
  res.redirect('/login');
  return;
}

const setForLogin = (user, res) => {
  let sessionid = new Date().getTime();
  res.set('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
}

const redirectToLogin = (req, res) => {
  if (!res.finished) res.redirect('/login');
}

const getLogin = (req, res, next) => {
  let fileContent = lib.getFileContent(fs, `./public${req.url}.html`);
  if (req.cookies.logInFailed) fileContent = fileContent.replace('placeholder', 'LOGIN FAILED');
  else fileContent = fileContent.replace('placeholder', '');
  res.send(fileContent);
  next();
}

const isValidUrl = (url) => {
  let urls = ['/', '/home', '/logout', '/createTodo', '/viewTodo', '/editTodo', '/deleteTodo', '/getTodoID', '/addTodo', '/addTask', '/viewTodoLists', '/viewSelectedTodo', '/deleteSelectedTodo', '/saveEditedTask', '/deleteSelectedTask'];
  return urls.includes(url);
}

const redirect_user_to_login_if_not_loggedIn = (req, res, next) => {
  if (!req.user && isValidUrl(req.url)) redirectToLogin(req,res);
  next();
}

const redirect_user_to_home_if_loggedIn = (req, res, next) => {
  if (req.url == '/login' && req.user) res.redirect('/home');
  next();
}

const postToHome = (req, res, next) => {
  let user = registered_users.find(u => u.userName == req.body.name);
  if (user) {
    todoApp.addUser(user.userName);
    todoApp.retrive(todoApp.getUser(user.userName), data);
    setForLogin(user, res);
  } else setForFailedLogin(res);
}

const getHome = (req, res, next) => {
  let fileContent = lib.getFileContent(fs, `./public/home.html`);
  if(req.user) fileContent = fileContent.replace('GREET', `Welcome ${req.user.name}`);
  res.send(fileContent);
}

const getLogout = (req, res) => {
  let sessionid = new Date().getTime();
  res.set('Set-Cookie', `sessionid=${sessionid}; Expires=${new Date(1).toUTCString()}`);
  delete req.user.sessionid;
  data[req.user.userName] = todoApp.getAllTodos(req.user.userName);
  lib.writeDataToFile(fs, path, data);
  redirectToLogin(req,res);
}

const getIndex = (req, res) => res.redirect('/home');

const getTodoFiles = (req, res) => {
  if(!res.finished) res.send(lib.getFileContent(fs, `./public${req.url}.html`));
}

const postToAddTodo = (req, res) => {
  let userName = req.user.userName;
  let todoTitle = req.body.todoTitle;
  let todoDescription = req.body.todoDescription;
  todoApp.addTodo(userName, todoTitle, todoDescription);
  data[userName] = todoApp.getAllTodos(userName);
  lib.writeDataToFile(fs, path, data);
}

const postToAddTask = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  let taskTitle = req.body.taskTitle;
  todoApp.addTask(userName, todoID, taskTitle);
  let tasks = todoApp.getAllTasks(userName, todoID);
  let tasksHtml = presentator.updateTaskList(tasks);
  res.send(tasksHtml);
  data[userName] = todoApp.getAllTodos(userName);
  lib.writeDataToFile(fs, path, data);
}

const getTodoID = (req, res) => {
  let userName = req.user.userName;
  let todoID = todoApp.getTodoID(userName);
  res.send(lib.toS(todoID));
}

const viewTodoLists = (req, res) => {
  let userName = req.user.userName;
  let todos = todoApp.getAllTodos(userName);
  let todosHtml = presentator.displayTodoTitles(todos);
  res.send(todosHtml);
}

const viewSelectedTodo = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  let currentTodo = todoApp.getTodo(userName, todoID);
  let todoHtml = presentator.viewCurrentTodo(currentTodo);
  res.send(lib.toS(todoHtml));
}

const viewTodoInView = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  let currentTodo = todoApp.getTodo(userName, todoID);
  let todoHtml = presentator.viewTodoInView(currentTodo);
  res.send(lib.toS(todoHtml));
}

const viewTodoToEdit = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  let currentTodo = todoApp.getTodo(userName, todoID);
  let todoHtml = presentator.viewTodoToEdit(currentTodo);
  res.send(lib.toS(todoHtml));
}

const deleteSelectedTodo = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  todoApp.deleteTodo(userName, todoID);
  todoApp.setTodoIDs(userName);
  let allTodoLists = todoApp.getAllTodos(userName);
  res.send(lib.toS(allTodoLists));
  data[userName] = todoApp.getAllTodos(userName);
  lib.writeDataToFile(fs, path, data);
}

const saveEditedTask = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  let taskID = req.body.taskID;
  let taskTitle = req.body.taskTitle;
  let taskStatus = req.body.taskStatus;
  todoApp.editTask(userName, todoID, taskID, taskTitle, taskStatus);
  let editedTask = todoApp.getTask(userName, todoID, taskID);
  res.send(lib.toS(editedTask));
  data[userName] = todoApp.getAllTodos(userName);
  lib.writeDataToFile(fs, path, data);
}

const deleteSelectedTask = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  let taskID = req.body.taskID;
  todoApp.deleteTask(userName, todoID, taskID);
  let tasks = todoApp.getAllTasks(userName, todoID);
  let tasksHtml = presentator.updateTaskListInEdit(tasks);
  res.send(tasksHtml);
  data[userName] = todoApp.getAllTodos(userName);
  lib.writeDataToFile(fs, path, data);
}

const addTaskInEdit = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  let taskTitle = req.body.taskTitle;
  todoApp.addTask(userName, todoID, taskTitle);
  let tasks = todoApp.getAllTasks(userName, todoID);
  let tasksHtml = presentator.updateTaskListInEdit(tasks);
  res.send(tasksHtml);
  data[userName] = todoApp.getAllTodos(userName);
  lib.writeDataToFile(fs, path, data);
}

const editTitleDesc = (req, res) => {
  let userName = req.user.userName;
  let todoID = req.body.todoID;
  let todoTitle = req.body.todoTitle;
  let todoDesc = req.body.todoDesc;
  todoApp.editTodoTitle(userName, todoID, todoTitle);
  todoApp.editTodoDescription(userName, todoID, todoDesc);
  let allTodoLists = todoApp.getAllTodos(userName);
  res.send(lib.toS(allTodoLists));
}


let app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(loadUser);
app.use(logRequest);
app.use(redirect_user_to_login_if_not_loggedIn);
app.use(redirect_user_to_home_if_loggedIn);
app.use(express.static('public'));
app.get('/', redirectToLogin);
app.get('/login', getLogin);
app.get('/home', getHome);
app.get('/logout', getLogout);
app.get('/createTodo', getTodoFiles);
app.get('/viewTodo', getTodoFiles);
app.get('/editTodo', getTodoFiles);
app.get('/deleteTodo', getTodoFiles);
app.get('/getTodoID', getTodoID);
app.post('/login', postToHome);
app.post('/addTodo', postToAddTodo);
app.post('/addTask', postToAddTask);
app.post('/viewTodoLists', viewTodoLists);
app.post('/viewSelectedTodo', viewSelectedTodo);
app.post('/viewTodoInView', viewTodoInView);
app.post('/viewTodoToEdit', viewTodoToEdit);
app.post('/deleteSelectedTodo', deleteSelectedTodo);
app.post('/saveEditedTask', saveEditedTask);
app.post('/deleteSelectedTask', deleteSelectedTask);
app.post('/addTaskInEdit', addTaskInEdit);
app.post('/editTitleDesc', editTitleDesc);

module.exports = app;
