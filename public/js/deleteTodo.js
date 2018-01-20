let currentTodoID;

const viewTodoLists = function () {
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load', displayTodoTitles);
  xmlReq.open('POST', '/viewTodoLists')
  xmlReq.send();
}

const displayTodoTitles = function () {
  let allTodos = JSON.parse(this.responseText);
  let todoIDs = Object.keys(allTodos);
  let generatedTodoTitles = todoIDs.reduce(function (accumulate, todoID, i) {
    let todoTitle = allTodos[todoID].title;
    return accumulate += `<p id='${todoIDs[i]}' onclick='viewSelectedTodo(this.id)'><a id='${todoIDs[i]}'>Title : ${todoTitle}</a></p>`;
  }, ``);
  document.getElementById('todoTitles').innerHTML = generatedTodoTitles;
}

const viewSelectedTodo = function (id) {
  currentTodoID = id;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load', viewCurrentTodo);
  xmlReq.open('POST', '/viewSelectedTodo');
  xmlReq.send(`todoSrNo=${id}`);
}

const viewCurrentTodo = function () {
  let todo = JSON.parse(this.responseText);
  let tasks = todo.tasks;
  let taskIDs = Object.keys(tasks);
  let generatedTasks = taskIDs.reduce(function (accumulate, taskID, i) {
    let taskTitle = tasks[taskID].title;
    return accumulate += `<label id='${taskIDs[i]}' size='100'>${taskTitle}</label><br/>`;
  }, ``);
  document.getElementById('todoTitles').innerHTML = '';
  document.getElementById('todoTitleHeader').innerHTML = `Title : ${todo.title}`;
  document.getElementById('todoDescHeader').innerHTML = `Description : ${todo.description}`;
  document.getElementById('tasks').innerHTML = `Tasks :`;
  document.getElementById('viewTasks').innerHTML = generatedTasks;
  document.getElementById('deleteTodoButton').style.visibility = 'visible';
}

const deleteSelectedTodo = function () {
  let xmlReq = new XMLHttpRequest();
  xmlReq.open('POST', '/deleteSelectedTodo');
  xmlReq.send(`todoSrNo=${currentTodoID}`);
  location.reload();
}

window.onload = viewTodoLists;
