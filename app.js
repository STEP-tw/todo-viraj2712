let fs = require('fs');
const WebApp = require('./webapp');
const Todo = require('./src/todoApp');
const utility = require('./lib/utility.js');
const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
const todoApp = new Todo();

let registered_users = [{
  userName: 'viraj'
}, {
  userName: 'salman'
}];

let writeDataToFile = data => {
  fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2));
}

let logRequest = (req, res) => {
  let text = ['------------------------------',
    `${new Date().toLocaleTimeString()}`,
    `${req.method} ${req.url}`,
  ].join('\n');
  console.log(text);
}

let loadUser = (req, res) => {
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
}

const serveStaticFiles = (req, res) => {
  let path = './public' + req.url;
  if (utility.isGetMethod(req) && utility.isFile(fs, path)) {
    let contentType = utility.getContentType(path);
    res.setHeader('Content-type', contentType);
    res.statusCode = 200;
    res.write(fs.readFileSync(path));
    res.end();
  };
}

const fileNotFound = (req, res) => {
  res.statusCode = 404;
  res.write(`${req.url} not found!`);
  res.end();
  return;
}

const redirectToLogin = (req, res) => res.redirect('/login');

const getLogin = (req, res) => {
  let fileData = utility.getFileContent(fs, './public/login.html');
  if (req.cookies.logInFailed) fileData = fileData.replace('placeholder', 'LOGIN FAILED');
  else fileData = fileData.replace('placeholder', '');
  res.write(fileData);
  res.end();
}

const setForFailedLogin = (res) => {
  res.setHeader('Set-Cookie', `logInFailed=true; Max-Age=${5}`);
  res.redirect('/login');
  return;
}

const setForLogin = (user, res) => {
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
}

const postToHome = (req, res) => {
  let user = registered_users.find(u => u.userName == utility.parseData(req.body.name));
  if (user) {
    todoApp.addUser(user.userName);
    todoApp.retrive(todoApp.getUser(user.userName), data);
    setForLogin(user, res);
  } else setForFailedLogin(res);
}

const redirect_user_to_login_if_not_loggedIn = (req, res) => {
  if (!req.urlIsOneOf(['/login', '/css/style.css']) && !req.user) res.redirect('/login');
}

const redirect_user_to_home_if_loggedIn = (req, res) => {
  if (req.urlIsOneOf(['/login']) && req.user) res.redirect('/home');
}

const getHome = (req, res) => {
  res.write(utility.getFileContent(fs, `./public/index.html`));
  res.end();
}

const getLogout = (req, res) => {
  res.setHeader('Set-Cookie', `sessionid=0 ; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`);
  delete req.user.sessionid;
  res.redirect('/login');
  data[req.user.userName] = todoApp.getAllTodos(req.user.userName);
  writeDataToFile(data);
}

const getIndex = (req, res) => res.redirect('/home');

const getTodoFiles = (req, res) => {
  res.write(utility.getFileContent(fs, `./public${req.url}.html`));
  res.end();
}

const postToAddTodo = (req, res) => {
  let userName = req.user.userName;
  let todoTitle = utility.parseData(req.body.todoTitle);
  let todoDescription = utility.parseData(req.body.todoDescription);
  todoApp.addTodo(userName, todoTitle, todoDescription);
  res.end();
  data[userName] = todoApp.getAllTodos(userName);
  writeDataToFile(data);
}

const postToAddTask = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = utility.parseData(req.body.todoSrNo);
  let taskTitle = utility.parseData(req.body.taskTitle);
  todoApp.addTask(userName, todoSrNo, taskTitle);
  let tasks = todoApp.getAllTasks(userName, todoSrNo);
  res.write(utility.toS(tasks));
  res.end();
  data[userName] = todoApp.getAllTodos(userName);
  writeDataToFile(data);
}

const getTodoSrNo = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = todoApp.getTodoSrNo(userName);
  res.write(utility.toS(todoSrNo));
  res.end();
}

const viewTodoLists = (req, res) => {
  let userName = req.user.userName;
  let allTodoLists = todoApp.getAllTodos(userName);
  res.write(utility.toS(allTodoLists));
  res.end();
}

const viewSelectedTodo = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = utility.parseData(req.body.todoSrNo);
  let currentTodo = todoApp.getTodo(userName, todoSrNo);
  res.write(utility.toS(currentTodo));
  res.end();
}

const deleteSelectedTodo = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = utility.parseData(req.body.todoSrNo);
  todoApp.deleteTodo(userName, todoSrNo);
  let allTodoLists = todoApp.getAllTodos(userName);
  res.write(utility.toS(allTodoLists));
  res.end();
  data[userName] = todoApp.getAllTodos(userName);
  writeDataToFile(data);
}

const saveEditedTask = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = utility.parseData(req.body.todoSrNo);
  let taskSrNo = utility.parseData(req.body.taskSrNo);
  let taskTitle = utility.parseData(req.body.taskTitle);
  let taskStatus = utility.parseData(req.body.taskStatus);
  todoApp.editTask(userName, todoSrNo, taskSrNo, taskTitle, taskStatus);
  let editedTask = todoApp.getTask(userName, todoSrNo, taskSrNo);
  res.write(utility.toS(editedTask));
  res.end();
  data[userName] = todoApp.getAllTodos(userName);
  writeDataToFile(data);
}

const deleteSelectedTask = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = req.body.todoSrNo;
  let taskSrNo = req.body.taskSrNo;
  todoApp.deleteTask(userName, todoSrNo, taskSrNo);
  let allTasks = todoApp.getAllTasks(userName, todoSrNo);
  res.write(utility.toS(allTasks));
  res.end();
  data[userName] = todoApp.getAllTodos(userName);
  writeDataToFile(data);
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirect_user_to_login_if_not_loggedIn);
app.use(redirect_user_to_home_if_loggedIn);
app.get('/', redirectToLogin);
app.get('/login', getLogin);
app.get('/home', getHome);
app.get('/logout', getLogout);
app.get('/index', getIndex);
app.get('/createTodo', getTodoFiles);
app.get('/viewTodo', getTodoFiles);
app.get('/editTodo', getTodoFiles);
app.get('/deleteTodo', getTodoFiles);
app.get('/getTodoSrNo', getTodoSrNo);
app.post('/login', postToHome);
app.post('/addTodo', postToAddTodo);
app.post('/addTask', postToAddTask);
app.post('/viewTodoLists', viewTodoLists);
app.post('/viewSelectedTodo', viewSelectedTodo);
app.post('/deleteSelectedTodo', deleteSelectedTodo);
app.post('/saveTodo', getTodoFiles);
app.post('/saveEditedTask', saveEditedTask);
app.post('/deleteSelectedTask', deleteSelectedTask);
app.addPostProcessor(serveStaticFiles);
app.addPostProcessor(fileNotFound);
module.exports = app;
