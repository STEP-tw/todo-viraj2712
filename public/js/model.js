const fs = require('fs');

const User = function(req) {
  this.user = req.user.userName;
  this.body = req.body;
}

User.prototype.toHtml = function(data){
  return `<p>${Object.keys(data)[0]} : ${data[Object.keys(data)[0]]}</p>`;
}

User.prototype.storeDataInFile = function(data){
  let content = data.map(this.toHtml).join('\n');
  fs.writeFileSync(`public/htmlFiles/lists.html`,content);
}

User.prototype.updateData = function(data) {
  let keys = Object.keys(data);
  let list = [];
  for (let i = 0; i < keys.length; i++) {
    let keyValue = {};
    keyValue[keys[i]] = data[keys[i]];
    list.push(keyValue);
  }
  return list;
}

User.prototype.getData = function() {
  let data = this.body;
  let updatedData = this.updateData(data);
  this.storeDataInFile(updatedData);
};

const storeData = function(req) {
  let user = new User(req);
  user.getData();
}

exports.storeData = storeData;
