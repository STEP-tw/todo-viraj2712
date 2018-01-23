const Task = require('./task.js');

class Todo {
  constructor(title, description) {
    this.taskID = 1;
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
  getTask(taskID) {
    return this.tasks[taskID];
  }
  addTask(task, status) {
    this.tasks[this.taskID] = new Task(task, status);
    this.increaseSrNo();
  }
  editTask(taskID, newTask) {
    return this.getTask(taskID).setTask(newTask);
  }
  deleteTask(taskID) {
    delete this.tasks[taskID];
  }
  getTaskStatus(taskID) {
    return this.getTask(taskID).getStatus();
  }
  setTaskStatus(taskID, status) {
    return this.getTask(taskID).setStatus(status);
  }
  getAllTasks() {
    return this.tasks;
  }
  increaseSrNo() {
    this.taskID++;
  }
}

module.exports = Todo;
