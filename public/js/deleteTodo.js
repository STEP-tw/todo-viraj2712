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
    return accumulate += `<p id='${todoIDs[i]}' onclick='deleteSelectedTodo(this.id)'><a id='${todoIDs[i]}'>Title : ${todoTitle}</a></p>`;
  }, ``);
  document.getElementById('todoTitles').innerHTML = generatedTodoTitles;
}

const deleteSelectedTodo = function (id) {
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load', viewTodoLists);
  xmlReq.open('POST', '/deleteSelectedTodo');
  xmlReq.send(`todoSrNo=${id}`);
}

window.onload = viewTodoLists;