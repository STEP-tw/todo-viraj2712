class Task {
  constructor(title) {
    this.title = title;
    this.status = false;
  }

  getTask() {
    return this.title;
  }
  setTask(newTask) {
    return this.title = newTask;
  }
  setStatus(status){
    return this.status = status;
  }
  getStatus() {
    return this.status;
  }
}

module.exports = Task;
