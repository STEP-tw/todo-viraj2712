const Task = require('./task.js');

class Todo {
  constructor(title, description) {
    this.taskSrNo = 1;
    this.title = title;
    this.description = description || '';
    this.tasks = {};
  }

  getTitle() {
    return this.title;
  }
  editTitle(newTitle) {
    return this.title = newTitle;
  }
  getDescription() {
    return this.description;
  }
  editDescription(newDescription) {
    return this.description = newDescription;
  }
  getTask(taskSrNo) {
    return this.tasks[taskSrNo];
  }
  addTask(task, status) {
    this.tasks[this.taskSrNo] = new Task(task, status);
    this.increaseSrNo();
  }
  editTask(taskSrNo, newTask) {
    return this.getTask(taskSrNo).setTask(newTask);
  }
  deleteTask(taskSrNo) {
    delete this.tasks[taskSrNo];
  }
  getTaskStatus(taskSrNo) {
    return this.getTask(taskSrNo).getStatus();
  }
  setTaskStatus(taskSrNo, status) {
    return this.getTask(taskSrNo).setStatus(status);
  }
  getAllTasks() {
    return this.tasks;
  }
  increaseSrNo() {
    this.taskSrNo++;
  }
}

module.exports = Todo;
