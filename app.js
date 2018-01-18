let fs = require('fs');
const WebApp = require('./webapp');
const Todo = require('./src/todoApp');
const todo = new Todo();

let registered_users = [{
  userName: 'viraj',
  name: 'Viraj Patil'
}];

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

let toS = o => JSON.stringify(o, null, 2);

let isGetMethod = function (req) {
  return req.method == 'GET';
}

let isFile = function (path) {
  return fs.existsSync(path);
}

const getFileContent = function (path) {
  return fs.readFileSync(path, 'utf8');
}

const getContentType = function (fileName) {
  let fileExtension = fileName.slice(fileName.lastIndexOf('.'));
  let extensions = {
    '.gif': 'image/gif',
    '.jpg': 'image/jpg',
    '.pdf': 'application/pdf',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
  };
  return extensions[fileExtension];
}

const serveStaticFiles = function (req, res) {
  let path = './public' + req.url;
  if (isGetMethod(req) && isFile(path)) {
    let contentType = getContentType(path);
    res.setHeader('Content-type', contentType);
    res.statusCode = 200;
    res.write(fs.readFileSync(path));
    res.end();
  };
}

const fileNotFound = function (req, res) {
  res.statusCode = 404;
  res.write(`${req.url} not found!`);
  res.end();
  return;
}

const redirectToLogin = (req, res) => res.redirect('/login');

const getLogin = (req, res) => {
  res.write(getFileContent('./public/login.html'));
  res.end();
}

const setForFailedLogin = (res) => {
  res.setHeader('Set-Cookie', `logInFailed=true`);
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
  let user = registered_users.find(u => u.userName == req.body.name)
  if (user) {
    todo.addUser(req.body.name);
    setForLogin(user, res);
  } else setForFailedLogin(res);
}

const getHome = (req, res) => {
  if (!req.user) res.redirect('/login');
  else res.write(getFileContent('./public/index.html'));
  res.end();
}

const getLogout = (req, res) => {
  if (req.user) {
    res.setHeader('Set-Cookie', [`loginFailed=false; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`, `sessionid=0 ; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`]);
    delete req.user.sessionid;
  }
  res.redirect('/login');
}

const getIndex = (req, res) => {
  res.redirect('/home');
}

const getCreateTodo = (req, res) => {
  if (req.user) {
    res.write(getFileContent('./public/createTodo.html'));
    res.end();
  } else res.redirect('/login');
}

const getViewTodo = (req, res) => {
  if (req.user) {
    res.write(getFileContent('./public/viewTodo.html'));
    res.end();
  } else res.redirect('/login');
}

const getEditTodo = (req, res) => {
  if (req.user) {
    res.write(getFileContent('./public/editTodo.html'));
    res.end();
  } else res.redirect('/login');
}

const getDeleteTodo = (req, res) => {
  if (req.user) {
    res.write(getFileContent('./public/deleteTodo.html'));
    res.end();
  } else res.redirect('/login');
}

const postToAddTodo = (req, res) => {
  let userName = req.user.userName;
  let todoTitle = req.body.todoTitle;
  let todoDescription = req.body.todoDescription;
  todo.addTodo(userName, todoTitle, todoDescription);
}

const postToAddTask = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = req.body.todoSrNo;
  let taskTitle = req.body.taskTitle;
  todo.addTask(userName, todoSrNo, taskTitle);
  let tasks = todo.getAllTasks(userName, todoSrNo);
  res.write(toS(tasks));
  res.end();
}

const getTodoSrNo = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = todo.getTodoSrNo(userName);
  res.write(toS(todoSrNo));
  res.end();
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.get('/', redirectToLogin);
app.get('/login', getLogin);
app.post('/home', postToHome);
app.get('/home', getHome);
app.get('/home?', getHome);
app.get('/logout', getLogout);
app.get('/index', getIndex);
app.get('/createTodo', getCreateTodo);
app.get('/viewTodo', getViewTodo);
app.get('/editTodo', getEditTodo);
app.get('/deleteTodo', getDeleteTodo);
app.post('/createTodo', postToAddTodo);
app.post('/addTask', postToAddTask);
app.get('/getTodoSrNo', getTodoSrNo);
app.addPostProcessor(serveStaticFiles);
app.addPostProcessor(fileNotFound);

module.exports = app;