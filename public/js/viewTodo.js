const viewTodoLists = () => doXhr('/viewTodoLists', 'post', displayTodoTitles);

const displayTodoTitles = function () {
  setHtml('todoTitles', this.responseText);
}

const viewSelectedTodo = (id) => doXhr('/viewTodoInView', 'post', viewCurrentTodo, `todoID=${id}`);

const viewCurrentTodo = function () {
  let todo = JSON.parse(this.responseText);
  setHtml('todoTitles', '');
  setHtml('todoTitleHeader', `Title : ${todo.title}`);
  setHtml('todoDescHeader', `Description : ${todo.desc}`);
  setHtml('tasks', `Tasks :`);
  setHtml('viewTasks', todo.tasks);
}

window.onload = viewTodoLists;
