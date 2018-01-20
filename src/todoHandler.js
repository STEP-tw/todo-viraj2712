const fs = require('fs');

class TodoHandler {
  constructor() {
    this.todos=JSON.parse(fs.readFileSync('./data/data.json','utf8'));
  }

  getTodos(userName){
    if(this.todos[userName]) return this.todos[userName];
    return {};
  }
  setTodos(userName,todos){
    this.todos[userName]=todos;
  }
  
  writeTodosToFile(){
    fs.writeFile('./data/data.json',JSON.stringify(this.todos),()=>{});
  }
}

module.exports=TodoHandler;
