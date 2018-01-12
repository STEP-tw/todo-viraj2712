let fs = require('fs');
const WebApp = require('./webapp');

let registered_users = [{
    userName: 'viraj',
    name: 'Viraj Patil'
  }
];

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

let isGetMethod = function(req) {
  return req.method == 'GET';
}

let isFile = function(path) {
  return fs.existsSync(path);
}

const getContentType = function(fileName) {
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

let serveFile = function(req, res) {
  if (req.url == '/') req.url = '/index.html';
  let path = './public' + req.url;
  if (isGetMethod(req) && isFile(path)) {
    let contentType = getContentType(path);
    res.setHeader('Content-type', contentType);
    res.write(fs.readFileSync(path));
    res.end();
  };
}

const redirectToLogin = (req,res) => {
  res.redirect('/login.html');
}

const checkIfRegisteredUser = (req, res) => {
  let user = registered_users.find(u => u.userName == req.body.name)
  if (!user) {
    res.setHeader('Set-Cookie', `logInFailed=true`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/homePage.html');
}

const redirectToIndex = (req,res) => {
  res.redirect('/index.html');
}

const redirectToAddList = (req,res) => {
  res.redirect('/addList.html');
}

const redirectToHome = (req,res) => {
  res.redirect('homePage.html');
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(serveFile);
app.get('/login',redirectToLogin);
app.post('/login',checkIfRegisteredUser);
app.get('/logout',redirectToIndex);
app.get('/addList',redirectToAddList);
app.post('/homePage',redirectToHome);

module.exports = app;
