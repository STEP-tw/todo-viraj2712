const addTodo = function () {
  let todoTitle = encodeURIComponent(document.getElementById('todoTitle').value);
  let todoDescription = encodeURIComponent(document.getElementById('todoDescription').value);
  let xmlReq = new XMLHttpRequest;
  xmlReq.open('POST', '/addTodo');
  xmlReq.send(`todoTitle=${todoTitle}&todoDescription=${todoDescription}`);
  disableAddTodoButton();
  enableOtherFields();
}

const disableAddTodoButton = function () {
  document.getElementById("addTodo").style.visibility = "hidden";
  document.getElementById("todoTitle").readOnly = true;
  document.getElementById("todoDescription").readOnly = true;
}

const enableOtherFields = function () {
  document.getElementById('addTaskInput').style.visibility = "visible";
  document.getElementById('addTask').style.visibility = "visible";
  document.getElementById('saveButton').style.visibility = "visible";
}

const addTask = function () {
  let taskTitle = encodeURIComponent(document.getElementById('addTaskInput').value);
  let todoID = document.getElementById('todoID').value;
  let xmlReq = new XMLHttpRequest;
  xmlReq.open('POST', '/addTask');
  xmlReq.addEventListener('load', updateTaskList);
  xmlReq.send(`todoID=${todoID}&taskTitle=${taskTitle}`);
}

const updateTaskList = function () {
  let tasks = JSON.parse(this.responseText);
  let taskKeys = Object.keys(tasks);
  let generatedTaskCode = taskKeys.reduce(function (accumulater, taskTitle, index) {
    let title = tasks[taskTitle].title;
    let srNo = index + 1;
    return accumulater += `<label id='${srNo}' size='100'>${title}</label><br/>`;
  }, ``);
  let textToShow = `Tasks : <br><br> ${generatedTaskCode}`;
  document.getElementById("displayTasks").innerHTML = textToShow;
}

const getTodoID = function () {
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load', displaytodoID);
  xmlReq.open('GET', '/getTodoID');
  xmlReq.send();
}

const displaytodoID = function () {
  document.getElementById('todoID').value = +this.responseText;
}

window.onload = getTodoID;
