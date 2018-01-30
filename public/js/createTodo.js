const addTodo = function () {
  let todoTitle = encodeValue('todoTitle');
  let todoDescription = encodeValue('todoDescription');
  let xhr = new XMLHttpRequest;
  xhr.open('POST', '/addTodo');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`todoTitle=${todoTitle}&todoDescription=${todoDescription}`);
  disableAddTodoButton();
  enableOtherFields();
}

const disableAddTodoButton = function () {
  setVisibility('addTodo', 'hidden');
  getElement('todoTitle').readOnly = true;
  getElement('todoDescription').readOnly = true;
}

const enableOtherFields = function () {
  setVisibility('addTaskInput', 'visible');
  setFocus('addTaskInput');
  setVisibility('addTask', 'visible');
  setVisibility('saveButton', 'visible');
}

const updateTaskList = function () {
  getElement('displayTasks').innerHTML = this.responseText;
}

const addTask = function () {
  let taskTitle = encodeValue('addTaskInput');
  let todoID = getValue('todoID');
  let data = `todoID=${todoID}&taskTitle=${taskTitle}`;
  doXhr('/addTask','post',updateTaskList,data);
}


const getTodoID = () => {
  doXhr('/getTodoID', 'get', displaytodoID);
  setFocus('todoTitle');
}

const displaytodoID = function () {
  getElement('todoID').value = +this.responseText;
}

window.onload = getTodoID;
