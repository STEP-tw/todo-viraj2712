let currentTodoID;

const viewTodoLists = () => doXhr('/viewTodoLists', 'post', displayTodoTitles);

const displayTodoTitles = function () {
  setHtml('todoTitles', this.responseText);
}

const viewSelectedTodo = function (id) {
  currentTodoID = id;
  doXhr('/viewSelectedTodo', 'post', viewCurrentTodo, `todoID=${id}`);
}

const viewCurrentTodo = function () {
  let todo = JSON.parse(this.responseText);
  setHtml('todoTitles', '');
  setHtml('todoTitleHeader', `Title : ${todo.title}`);
  setHtml('todoDescHeader', `Description : ${todo.desc}`);
  setHtml('tasks', `Tasks :`);
  setHtml('viewTasks', todo.tasks);
  document.getElementById('deleteTodoButton').style.visibility = 'visible';
}

const deleteSelectedTodo = function () {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/deleteSelectedTodo');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`todoID=${currentTodoID}`);
  location.reload();
}

window.onload = viewTodoLists;
