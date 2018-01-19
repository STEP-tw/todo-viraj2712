const fs = require('fs');
class TodoHandler {
  constructor() {
    this.todos=require('./data/data.json');
  }
  getTodos(userName){
    return this.todos[userName];
  }
  setTodos(userName,todos){
    this.todos[userName]=todos;
  }
  writeTodosToFile(){
    fs.writeFile('./data/data.json',JSON.stringify(this.todos),()=>{});
  }
}
module.exports=TodoHandler;
