let fs = require('fs');
const WebApp = require('./webapp');
const Todo = require('./src/todoApp');
const todo = new Todo();

let registered_users = [{
  userName: 'viraj',
  name: 'Viraj Patil'
}, {
  userName: 'salman',
  name: 'Salman Shaik'
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
  let user = registered_users.find(u => u.sessionid != undefined);
  if (sessionid && user) {
    req.user = user;
  }
}

let toS = o => JSON.stringify(o, null, 2);

let isGetMethod = req => req.method == 'GET';

let isFile = path => fs.existsSync(path);

const getFileContent = path => fs.readFileSync(path, 'utf8');

const getContentType = (fileName) => {
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

const serveStaticFiles = (req, res) => {
  let path = './public' + req.url;
  if (isGetMethod(req) && isFile(path)) {
    let contentType = getContentType(path);
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
  console.log(req.body);
  let user = registered_users.find(u => u.userName == req.body.name)
  if (user) {
    todo.addUser(req.body.name);
    setForLogin(user, res);
  } else setForFailedLogin(res);
}

const redirect_user_to_login_if_not_loggedIn = (req, res) => {
  let allUrls = ['/', '/home','/home?','/logout','/index','/createTodo','/viewTodo','/editTodo','/deleteTodo','/getTodoSrNo'];
  if (req.method == 'GET' && req.urlIsOneOf(allUrls) && !req.user)             res.redirect('/login');
}

const redirect_user_to_home_if_loggedIn = (req, res) => {
  if (req.method == 'GET' && req.urlIsOneOf('/login') && req.user) res.redirect('/home');
}

const getHome = (req, res) => {
  res.write(getFileContent(`./public/index.html`));
  res.end();
}

const getLogout = (req, res) => {
  res.setHeader('Set-Cookie', [`loginFailed=false; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`, `sessionid=0 ; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`]);
  delete req.user.sessionid;
  res.redirect('/logout');
}

const getIndex = (req, res) => res.redirect('/home');

const getTodoFiles = (req, res) => {
  res.write(getFileContent(`./public${req.url}.html`));
  res.end();
}

const postToAddTodo = (req, res) => {
  let userName = req.user.userName;
  let todoTitle = req.body.todoTitle;
  let todoDescription = req.body.todoDescription;
  todo.addTodo(userName, todoTitle, todoDescription);
  res.end();
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

const changeStatus = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = req.body.todoSrNo;
  let taskSrNo = req.body.taskSrNo;
  let status = req.body.status == "true";
  todo.setTaskStatus(userName, todoSrNo, taskSrNo, status);
  res.end();
}

const getTodoSrNo = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = todo.getTodoSrNo(userName);
  res.write(toS(todoSrNo));
  res.end();
}

const viewTodoLists = (req, res) => {
  let userName = req.user.userName;
  let allTodoLists = todo.getAllTodos(userName);
  res.write(toS(allTodoLists));
  res.end();
}

const viewSelectedTodo = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = req.body.todoSrNo;
  let currentTodo = todo.getTodo(userName, todoSrNo);
  res.write(toS(currentTodo));
  res.end();
}

const deleteSelectedTodo = (req, res) => {
  let userName = req.user.userName;
  let todoSrNo = req.body.todoSrNo;
  todo.deleteTodo(userName, todoSrNo);
  let allTodoLists = todo.getAllTodos(userName);
  res.write(toS(allTodoLists));
  res.end();
}

const saveEditedTask = (req,res) => {
  let userName = req.user.userName;
  let todoSrNo = req.body.todoSrNo;
  let taskSrNo = req.body.taskSrNo;
  let taskTitle = req.body.taskTitle;
  let editedTask = todo.editTask(userName,todoSrNo,taskSrNo,taskTitle);
  res.write(toS(editedTask));
  res.end();
}

const deleteSelectedTask = (req,res) => {
  let userName = req.user.userName;
  let todoSrNo = req.body.todoSrNo;
  let taskSrNo = req.body.taskSrNo;
  todo.deleteTask(userName,todoSrNo,taskSrNo);
  let allTasks = todo.getAllTasks(userName,todoSrNo);
  res.write(toS(allTasks));
  res.end();
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
app.post('/home', postToHome);
app.post('/addTodo', postToAddTodo);
app.post('/addTask', postToAddTask);
app.post('/changeStatus', changeStatus);
app.post('/viewTodoLists', viewTodoLists);
app.post('/viewSelectedTodo', viewSelectedTodo);
app.post('/deleteSelectedTodo', deleteSelectedTodo);
app.post('/saveTodo', getTodoFiles);
app.post('/saveEditedTask', saveEditedTask);
app.post('/deleteSelectedTask',deleteSelectedTask);

app.addPostProcessor(serveStaticFiles);
app.addPostProcessor(fileNotFound);

module.exports = app;
