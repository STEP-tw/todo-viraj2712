let fs = require('fs');
const WebApp = require('./webapp');
const storeData = require('./public/js/model.js').storeData;
const addPara = require('./public/js/view.js').addPara;

let registered_users = [{
    userName: 'viraj',
    name: 'Viraj Patil'
  },
  {
    userName: 'pranav',
    name: 'Pranav Bansod'
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

const redirectToLogin = (req, res) => {
  if (req.user) res.redirect('/homePage.html');
  else res.redirect('/login.html');
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

const redirectToIndex = (req, res) => {
  if (!req.user) {
    res.redirect('/index.html');
    return;
  }
  res.setHeader('Set-Cookie', [`loginFailed=false; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`, `sessionid=0 ; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`]);
  res.redirect('/index.html')
  delete req.user.sessionid;
}

const redirectToAddList = (req, res) => {
  if (req.user) res.redirect('/addList.html');
  else res.redirect('/index.html');
}

const storeDataInFiles = (req,content) => {
  let path = `./public/htmlFiles/${req.user.userName}.html`;
  if (fs.existsSync(path)) {
    content += `--------------------------`;
    fs.appendFile(path, content, () => {});
  }
  else {
    fs.writeFileSync(path, content);
  }
}

const redirectToHome = (req, res) => {
  let content = storeData(req);
  storeDataInFiles(req,content);
  res.redirect('/homePage.html');
}

const redirectToViewList = (req, res) => {
  res.write(fs.readFileSync('public/viewLists.html'));
  res.write(fs.readFileSync(`public/htmlFiles/${req.user.userName}.html`));
  res.end();
}

let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(serveFile);
app.get('/login', redirectToLogin);
app.post('/login', checkIfRegisteredUser);
app.get('/logout', redirectToIndex);
app.get('/addList', redirectToAddList);
app.post('/homePage', redirectToHome);
app.get('/viewLists', redirectToViewList);

module.exports = app;
