const http = require('http');
const fs = require('fs');
let app = require('./app.js');
const path = './data/data.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

let registered_users = [{
  userName: 'viraj',
  name: 'Viraj Patil'
}, {
  userName: 'salman',
  name: 'Salman Shaik'
}];

app.fs = fs;
app.path = path;
app.data = data;
app.registered_users = registered_users;

const PORT = 8000;
let server = http.createServer(app);
server.on('error', e => console.error('**error**', e.message));
server.listen(PORT, (e) => console.log(`server listening at ${PORT}`));
