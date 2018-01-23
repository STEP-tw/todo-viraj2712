let titleID;

const viewTodoLists = function() {
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load', displayTodoTitles);
  xmlReq.open('POST', '/viewTodoLists')
  xmlReq.send();
}

const displayTodoTitles = function() {
  let allTodos = JSON.parse(this.responseText);
  let todoIDs = Object.keys(allTodos);
  let generatedTodoTitles = todoIDs.reduce(function(accumulate, todoID, i) {
    let todoTitle = allTodos[todoID].title;
    return accumulate += `<p id='${todoIDs[i]}' onclick='viewSelectedTodo(this.id)'><a id='${todoIDs[i]}'>Title : ${todoTitle}</a></p>`;
  }, ``);
  document.getElementById('todoTitles').innerHTML = generatedTodoTitles;
}

const viewSelectedTodo = function(id) {
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load', viewCurrentTodo);
  xmlReq.open('POST', '/viewSelectedTodo');
  xmlReq.send(`todoID=${id}`);
  document.getElementById('todoID').value = id;
}

const viewCurrentTodo = function() {
  let todo = JSON.parse(this.responseText);
  let tasks = todo.tasks;
  let taskIDs = Object.keys(tasks);
  let generatedTasks = taskIDs.reduce(function(accumulate, taskID, i) {
    let taskTitle = tasks[taskID].title;
    let taskStatus = tasks[taskID].status;
    let status = `<input type=checkbox id=status${taskIDs[i]}`;
    if (taskStatus == 'true' || taskStatus == true) status += ' checked';
    status += '>';
    return accumulate += `${status}<input id='${taskIDs[i]}' type='text' value='${taskTitle}'> <button id='edit${taskIDs[i]}' onclick='saveEditedTask(this.id)'>Save</button> <button id='delete${taskIDs[i]}' onclick='deleteTask(this.id)'>Delete</button><br/>`;
  }, ``);
  document.getElementById('todoTitles').innerHTML = '';
  document.getElementById('todoTitleHeader').innerHTML = `Title : <input type='text' id='todoTitleInput' value='${todo.title}'>`;
  document.getElementById('todoDescHeader').innerHTML = `Description : <textArea id='todoDescInput'>${todo.description}</textArea>`;
  document.getElementById('tasks').innerHTML = `Tasks :`;
  document.getElementById('viewTasks').innerHTML = generatedTasks;
  document.getElementById('saveTodoButtonInEdit').style.visibility = 'visible';
  document.getElementById('addTaskInputInEdit').style.visibility = 'visible';
  document.getElementById('addTaskInEdit').style.visibility = 'visible';
}

const saveEditedTask = function(id) {
  titleID = id.slice(-1);
  let todoID = document.getElementById('todoID').value;
  let taskTitle = encodeURIComponent(document.getElementById(titleID).value);
  let taskStatus = document.getElementById(`status${titleID}`).checked;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load', showEditedTask);;
  xmlReq.open('POST', '/saveEditedTask');
  xmlReq.send(`todoID=${todoID}&taskID=${titleID}&taskTitle=${taskTitle}&taskStatus=${taskStatus}`);
}

const showEditedTask = function() {
  let task = JSON.parse(this.responseText);
  let taskTitle = task.title;
  document.getElementById(titleID).innerText = taskTitle;
}

const deleteTask = function(id) {
  titleID = id.slice(-1);
  let todoID = document.getElementById('todoID').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load', deleteSelectedTask);
  xmlReq.open('POST', '/deleteSelectedTask');
  xmlReq.send(`todoID=${todoID}&taskID=${titleID}`);
}

const deleteSelectedTask = function() {
  let tasks = JSON.parse(this.responseText);
  let taskIDs = Object.keys(tasks);
  let generatedTasks = taskIDs.reduce(function(accumulate, taskID, i) {
    let taskTitle = tasks[taskID].title;
    let taskStatus = tasks[taskID].status;
    let status = `<input type=checkbox id=status${taskIDs[i]}`;
    if (taskStatus == 'true' || taskStatus == true) status += ' checked';
    status += '>';
    return accumulate += `${status}<input id='${taskIDs[i]}' type='text' value='${taskTitle}'> <button id='edit${taskIDs[i]}' onclick='saveEditedTask(this.id)'>Save</button> <button id='delete${taskIDs[i]}' onclick='deleteTask(this.id)'>Delete</button><br/>`;
  }, ``);
  document.getElementById('viewTasks').innerHTML = generatedTasks;
}

const addTaskInEdit = function() {
  let taskTitle = encodeURIComponent(document.getElementById('addTaskInputInEdit').value);
  let todoID = document.getElementById('todoID').value;
  let xmlReq = new XMLHttpRequest;
  xmlReq.open('POST', '/addTask');
  xmlReq.addEventListener('load', updateTaskList);
  xmlReq.send(`todoID=${todoID}&taskTitle=${taskTitle}`);
}

const updateTaskList = function() {
  let tasks = JSON.parse(this.responseText);
  let taskIDs = Object.keys(tasks);
  let generatedTasks = taskIDs.reduce(function(accumulate, taskID, i) {
    let taskTitle = tasks[taskID].title;
    let taskStatus = tasks[taskID].status;
    let status = `<input type=checkbox id=status${taskIDs[i]}`;
    if (taskStatus == 'true' || taskStatus == true) status += ' checked';
    status += '>';
    return accumulate += `${status}<input id='${taskIDs[i]}' type='text' value='${taskTitle}'> <button id='edit${taskIDs[i]}' onclick='saveEditedTask(this.id)'>Save</button> <button id='delete${taskIDs[i]}' onclick='deleteTask(this.id)'>Delete</button><br/>`;
  }, ``);
  document.getElementById('viewTasks').innerHTML = generatedTasks;
}

const editTodo = function(){
  let todoTitle = encodeURIComponent(document.getElementById('todoTitleInput').value);
  let todoDesc = encodeURIComponent(document.getElementById('todoDescInput').value);
  let todoID = document.getElementById('todoID').value;
  let xmlReq = new XMLHttpRequest;
  xmlReq.open('POST', '/editTitleDesc');
  xmlReq.send(`todoID=${todoID}&todoTitle=${todoTitle}&todoDesc=${todoDesc}`);
  location.href = '/home';
}

window.onload = viewTodoLists;
