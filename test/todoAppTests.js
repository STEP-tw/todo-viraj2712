const assert = require('chai').assert;
const App = require('../src/todoApp.js');

var app;

describe('App', () => {

  beforeEach(() => {
    app = new App();
    app.addUser('vp', 2712);
    app.addTodo('vp', 'pg', 'eat');
    app.addTask('vp', 1, 'to sleep');
  })

  describe('#getUser()', () => {
    it('should return the user from app', () => {
      let actual = app.getUser('vp');
      let expected = {
        userName: 'vp',
        password: 2712,
        todoSrNo: 2,
        todos: {
          1: {
            title: 'pg',
            description: 'eat',
            taskSrNo: 2,
            tasks: {
              1: {
                status: false,
                title: 'to sleep'
              }
            }
          }
        }
      }
      assert.deepEqual(actual, expected);
    })
  })

  describe('#addUser()', () => {
    it('should add the given user in app', () => {
      app.addUser('v', 1);
      let actual = app.getUser('v');
      let expected = {
        userName: 'v',
        password: 1,
        todoSrNo: 1,
        todos: {}
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#getTodo()', () => {
    it('should return the todo of given user from app', () => {
      let actual = app.getTodo('vp', 1);
      let expected = {
        title: 'pg',
        description: 'eat',
        taskSrNo: 2,
        tasks: {
          1: {
            status: false,
            title: 'to sleep'
          }
        }
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#getTodoTitle()', () => {
    it('should return the title of given todo of given user from app', () => {
      let actual = app.getTodoTitle('vp', 1);
      let expected = 'pg';
      assert.equal(actual, expected);
    })
  })

  describe('#editTodoTitle()', () => {
    it('should edit the title of given todo of given user from app', () => {
      app.editTodoTitle('vp', 1, 'office');
      let actual = app.getTodoTitle('vp', 1);
      let expected = 'office';
      assert.equal(actual, expected);
    })
  })

  describe('#getTodoDescription()', () => {
    it('should return the description of given todo of given user from app', () => {
      let actual = app.getTodoDescription('vp', 1);
      let expected = 'eat';
      assert.equal(actual, expected);
    })
  })

  describe('#editTodoDescription()', () => {
    it('should edit the description of given todo of given user from app', () => {
      app.editTodoDescription('vp', 1, 'sleep');
      let actual = app.getTodoDescription('vp', 1);
      let expected = 'sleep';
      assert.equal(actual, expected);
    })
  })

  describe('#addTodo()', () => {
    it('should add the given todo of given user in app', () => {
      app.addTodo('vp', 'office', 'sleep');
      let actual = app.getTodo('vp', 2);
      let expected = {
        title: 'office',
        description: 'sleep',
        taskSrNo: 1,
        tasks: {}
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#deleteTodo()', () => {
    it('should delete the given todo of given user in app', () => {
      app.addTodo('vp', 'office', 'sleep');
      app.deleteTodo('vp', 1);
      let actual = app.getAllTodos('vp');
      let expected = {
        2: {
          title: 'office',
          description: 'sleep',
          taskSrNo: 1,
          tasks: {}
        }
      };
      assert.deepEqual(actual, expected);
      assert.doesNotHaveAnyKeys(actual, [1]);
    })
  })

  describe('#getTask()', () => {
    it('should return the task of given user from given todo from app', () => {
      let actual = app.getTask('vp', 1, 1);
      let expected = {
        title: 'to sleep',
        status: false
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#editTask()', () => {
    it('should edit the task of given user from given todo from app', () => {
      app.editTask('vp', 1, 1, 'to eat',true);
      let actual = app.getTask('vp', 1, 1);
      let expected = {
        title: 'to eat',
        status: true
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#addTask()', () => {
    it('should add the given task from given user of given todo in app', () => {
      app.addTask('vp', 1, 'to eat');
      let actual = app.getAllTasks('vp', 1);
      let expected = {
        1: {
          title: 'to sleep',
          status: false
        },
        2: {
          title: 'to eat',
          status: false
        }
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#deleteTask()', () => {
    it('should delete the given task of given user from given todo from app', () => {
      app.addTask('vp', 1, 'to eat');
      app.deleteTask('vp', 1, 1);
      let actual = app.getAllTasks('vp', 1);
      let expected = {
        2: {
          title: 'to eat',
          status: false
        }
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#setTaskStatus()', () => {
    it('should set the status for given task of given user from given todo in app as true', () => {
      app.setTaskStatus('vp', 1, 1, true);
      let actual = app.getTaskStatus('vp', 1, 1);
      let expected = true;
      assert.deepEqual(actual, expected);
    })
  })

  describe('#setTaskStatus()', () => {
    it('should set the status for given task of given user from given todo in app as false', () => {
      app.setTaskStatus('vp', 1, 1, false);
      let actual = app.getTaskStatus('vp', 1, 1);
      let expected = false;
      assert.deepEqual(actual, expected);
    })
  })

  describe('#getAllTodos()', () => {
    it('should return the all todos of given user from app', () => {
      let actual = app.getAllTodos('vp');
      let expected = {
        1: {
          title: 'pg',
          description: 'eat',
          taskSrNo: 2,
          tasks: {
            1: {
              title: 'to sleep',
              status: false
            }
          }
        }
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#getAllTasks()', () => {
    it('should return the all tasks of given user of given todo from app', () => {
      app.addTask('vp', 1, 'to eat');
      let actual = app.getAllTasks('vp', 1);
      let expected = {
        1: {
          title: 'to sleep',
          status: false
        },
        2: {
          title: 'to eat',
          status: false
        }
      };
      assert.deepEqual(actual, expected);
    })
  })

})
