const http = require('http');
const fs = require('fs');
let app = require('./app.js');

// app.fs = fs;
// app.path = path;
// app.data = data;
// app.registered_users = registered_users;

const PORT = 8000;
let server = http.createServer(app);
server.on('error', e => console.error('**error**', e.message));
server.listen(PORT, (e) => console.log(`server listening at ${PORT}`));
