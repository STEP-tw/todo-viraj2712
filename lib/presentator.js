const Presentator = {};

Presentator.updateTaskList = function (tasks) {
  let taskKeys = Object.keys(tasks);
  let generatedTaskCode = taskKeys.reduce(function (accumulater, taskTitle, index) {
    let title = tasks[taskTitle].title;
    let srNo = index + 1;
    return accumulater += `<label id='${srNo}' size='100'>${title}</label><br/>`;
  }, ``);
  return `Tasks : <br><br> ${generatedTaskCode}`;
}

Presentator.displayTodoTitles = function (todos) {
  let todoIDs = Object.keys(todos);
  return todoIDs.reduce(function (accumulate, todoID, i) {
    let todoTitle = todos[todoID].title;
    return accumulate += `<p id='${todoIDs[i]}' onclick='viewSelectedTodo(this.id)'><a id='${todoIDs[i]}'>Title : ${todoTitle}</a></p>`;
  }, ``);
}

Presentator.viewCurrentTodo = function (todo) {
  let tasks = todo.tasks;
  let taskIDs = Object.keys(tasks);
  let tasksHtml = taskIDs.reduce(function (accumulate, taskID, i) {
    let taskTitle = tasks[taskID].title;
    return accumulate += `<label id='${taskIDs[i]}' size='100'>${taskTitle}</label><br/>`;
  }, ``);
  return { 'title': `${todo.title}`, 'desc': `${todo.description}`, 'tasks': `${tasksHtml}` };
}

Presentator.taskGenerator = function(tasks,taskIDs){
  return taskIDs.reduce(function (accumulate, taskID, i) {
    let taskTitle = tasks[taskID].title;
    let taskStatus = tasks[taskID].status;
    let status = `<input type=checkbox id=status${taskIDs[i]}`;
    if (taskStatus == 'true' || taskStatus == true) status += ' checked';
    status += '>';
    return accumulate += `${status}<input id='${taskIDs[i]}' type='text' value='${taskTitle}'> <button id='edit${taskIDs[i]}' onclick='saveEditedTask(this.id)'>Save</button> <button id='delete${taskIDs[i]}' onclick='deleteTask(this.id)'>Delete</button><br/>`;
  }, ``);
}

Presentator.viewTodoToEdit = function(todo) {
  let tasks = todo.tasks;
  let taskIDs = Object.keys(tasks);
  let tasksHtml = this.taskGenerator(tasks,taskIDs);
  return { 'title': `${todo.title}`, 'desc': `${todo.description}`, 'tasks': `${tasksHtml}` };
}

Presentator.updateTaskListInEdit = function(tasks){
  let taskIDs = Object.keys(tasks);
  let tasksHtml = this.taskGenerator(tasks,taskIDs);
  return tasksHtml;
}

Presentator.viewTodoInView = function (todo) {
  let tasks = todo.tasks;
  let taskIDs = Object.keys(tasks);
  let tasksHtml = taskIDs.reduce(function (accumulate, taskID, i) {
    let taskTitle = tasks[taskID].title;
    let taskStatus = tasks[taskID].status;
    let status = `<input type=checkbox id=status${taskIDs[i]} disabled=true`;
    if (taskStatus == 'true' || taskStatus == true) status += ' checked';
    status += '>';
    return accumulate += `${status}${taskTitle}</input><br/>`;
  }, ``);
  return { 'title': `${todo.title}`, 'desc': `${todo.description}`, 'tasks': `${tasksHtml}` };
}

module.exports = Presentator;