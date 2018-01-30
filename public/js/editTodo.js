let titleID;

const viewTodoLists = () => doXhr('/viewTodoLists', 'post', displayTodoTitles);

const displayTodoTitles = function () {
  setHtml('todoTitles', this.responseText);
}

const viewSelectedTodo = function (id) {
  doXhr('/viewTodoToEdit', 'post', viewTodoToEdit, `todoID=${id}`);
  getElement('todoID').value = id;
}

const viewTodoToEdit = function () {
  let todo = JSON.parse(this.responseText);
  setHtml('todoTitles', '');
  setHtml('todoTitleHeader', `Title : <input type='text' id='todoTitleInput' value='${todo.title}'>`);
  setHtml('todoDescHeader', `Description : <textArea id='todoDescInput'>${todo.desc}</textArea>`);
  setHtml('tasks', `Tasks :`);
  setHtml('viewTasks', todo.tasks);
  setVisibility('saveTodoButtonInEdit','visible');
  setVisibility('addTaskInputInEdit','visible');
  setVisibility('addTaskInEdit','visible');
  setFocus('todoTitleInput');
}

const saveEditedTask = function (id) {
  titleID = id.slice(-1);
  let todoID = getValue('todoID');
  let taskTitle = encodeValue(titleID);
  let taskStatus = getElement(`status${titleID}`).checked;
  let data = `todoID=${todoID}&taskID=${titleID}&taskTitle=${taskTitle}&taskStatus=${taskStatus}`;
  doXhr('/saveEditedTask', 'post', showEditedTask, data);
}

const showEditedTask = function () {
  let task = JSON.parse(this.responseText);
  let taskTitle = task.title;
  getElement(titleID).innerText = taskTitle;
}

const deleteTask = function (id) {
  titleID = id.slice(-1);
  let todoID = getValue('todoID');
  let data = `todoID=${todoID}&taskID=${titleID}`;
  doXhr('/deleteSelectedTask', 'post', updateTaskListInEdit, data);
}

const addTaskInEdit = function () {
  let taskTitle = encodeValue('addTaskInputInEdit');
  let todoID = getValue('todoID');
  let data = `todoID=${todoID}&taskTitle=${taskTitle}`;
  doXhr('/addTaskInEdit', 'post', updateTaskListInEdit, data);
}

const updateTaskListInEdit = function () {
  setHtml('viewTasks', this.responseText);
}

const editTodo = function () {
  let todoTitle = encodeValue('todoTitleInput');
  let todoDesc = encodeValue('todoDescInput');
  let todoID = getValue('todoID');
  let xhr = new XMLHttpRequest;
  xhr.open('POST', '/editTitleDesc');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`todoID=${todoID}&todoTitle=${todoTitle}&todoDesc=${todoDesc}`);
  location.href = '/home';
}

window.onload = viewTodoLists;
