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
    return accumulate += `<input id='${taskIDs[i]}' type='text' value='${taskTitle}'>       <button id='${taskIDs[i]}' onclick='saveEditedTask(this.id)'>save</button><br/>`;
  }, ``);
  document.getElementById('todoTitles').innerHTML = '';
  document.getElementById('todoTitleHeader').innerHTML = `Title : <input type='text' value='${todo.title}'>`;
  document.getElementById('todoDescHeader').innerHTML = `Description : <input type='text' value='${todo.description}'>`;
  document.getElementById('tasks').innerHTML = `Tasks :`;
  document.getElementById('viewTasks').innerHTML = generatedTasks;
  document.getElementById('saveTodoButton').style.visibility = 'visible';
}

const saveEditedTask = function(id){
  let xmlReq = new XMLHttpRequest();
  xmlReq.open('POST','/saveEditedTask');
  xmlReq.send(`taskSrNo=${id}`);
}

window.onload = viewTodoLists;