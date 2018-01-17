const addTodo = function() {
  let todoTitle = document.getElementById('todoTitle').value;
  let todoDescription = document.getElementById('todoDescription').value;
  let xmlReq = new XMLHttpRequest;
  xmlReq.open('POST', '/createTodo');
  xmlReq.send(`todoTitle=${todoTitle}&todoDescription=${todoDescription}`);
  disableAddTodoButton();
  enableOtherFields();
}

const disableAddTodoButton = function () {
  document.getElementById("addTodo").style.visibility = "hidden";
  document.getElementById("todoTitle").readOnly = true;
  document.getElementById("todoDescription").readOnly = true;
}

const enableOtherFields = function() {
  document.getElementById('addTaskInput').style.visibility = "visible";
  document.getElementById('addTask').style.visibility = "visible";
  document.getElementById('saveButton').style.visibility = "visible";
}

const addTask = function () {
  let taskTitle = document.getElementById('addTaskInput').value;
  let todoSrNo = document.getElementById('todoSrNo').value;
  let xmlReq = new XMLHttpRequest;
  xmlReq.open('POST','/addTask');
  xmlReq.addEventListener('load',updateTaskList);
  xmlReq.send(`todoSrNo=${todoSrNo}&taskTitle=${taskTitle}`);
}

const updateTaskList = function() {
  let todo = JSON.parse(this.responseText);
  console.log(todo);
}

const getTodoSrNo = function(){
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',displayTodoSrNo);
  xmlReq.open('GET','/getTodoSrNo');
  xmlReq.send();
}

const displayTodoSrNo = function(){
  document.getElementById('todoSrNo').value = +this.responseText;
}

window.onload = getTodoSrNo;