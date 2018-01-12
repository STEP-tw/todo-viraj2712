const User = function(req){
  this.user = req.user.userName;
  this.body = req.body;
}

User.prototype.getData = function () {
  let data = this.body;
  let html = this.toHtml(data);
};

const storeData = function(req){
  let user = new User(req);
}
