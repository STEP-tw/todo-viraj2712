const fs = require('fs');

const User = function(req) {
  this.user = req.user.userName;
  this.body = req.body;
}

User.prototype.toHtml = function(data){
  let key = Object.keys(data)[0];
  let value = data[Object.keys(data)[0]];
  if(key.includes('%')) key = 'Task';
  return `<p>${key} : ${value}</p>`;
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
  let content = updatedData.map(this.toHtml).join('\n');
  return content;
};

const storeData = function(req) {
  let user = new User(req);
  return user.getData();
}

exports.storeData = storeData;
