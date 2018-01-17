let fs = require('fs');
const WebApp = require('./webapp');

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

const serveFile = function (req, res) {
  if (req.url == '/') req.url = '/login.html';
  let path = './public' + req.url;
  if (isGetMethod(req) && isFile(path)) {
    let contentType = getContentType(path);
    res.setHeader('Content-type', contentType);
    res.write(fs.readFileSync(path));
    res.end();
  };
}

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

const postHome = (req, res) => {
  let user = registered_users.find(u => u.userName == req.body.name)
  if (user) {
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
  res.write(getFileContent('./public/createTodo.html'));
  res.end();
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.get('/login', getLogin);
app.post('/home', postHome);
app.get('/home', getHome);
app.get('/logout', getLogout);
app.get('/index', getIndex);
app.get('/createTodo', getCreateTodo);
app.use(serveFile);

module.exports = app;
