const assert = require('chai').assert;
const User = require('../srcModules/user.js');

var user;

describe('User', () => {

  beforeEach(() => {
    user = new User('vp', '1234');
    user.addTodo('pg', 'eat');
    user.addTask(1, 'to eat');
  })

  describe('#getTodo()', () => {
    it('should return the specific todo of given user', () => {
      let actual = user.getTodo(1);
      let expected = {
        title: 'pg',
        description: 'eat',
        taskSrNo: 2,
        tasks: {
          1: {
            status: false,
            title: 'to eat'
          }
        }
      }
      assert.deepEqual(actual, expected);
    })
  })

  describe('#getTodoTitle()', () => {
    it('should return the title of specific todo of given user', () => {
      let actual = user.getTodoTitle(1);
      let expected = 'pg';
      assert.equal(actual, expected);
    })
  })

  describe('#editTodoTitle()', () => {
    it('should edit the title of specific todo of given user', () => {
      user.editTodoTitle(1, 'office');
      let actual = user.getTodoTitle(1);
      let expected = 'office';
      assert.equal(actual, expected);
    })
  })

  describe('#getTodoDescription()', () => {
    it('should return the description of specific todo of given user', () => {
      let actual = user.getTodoDescription(1);
      let expected = 'eat';
      assert.equal(actual, expected);
    })
  })

  describe('#editTodoDescription()', () => {
    it('should edit the description of specific todo of given user', () => {
      user.editTodoDescription(1, 'sleep');
      let actual = user.getTodoDescription(1);
      let expected = 'sleep';
      assert.equal(actual, expected);
    })
  })

  describe('#addTodo()', () => {
    it('should add the todo of given user', () => {
      user.addTodo('office', 'sleep');
      let actualTitle = user.getTodoTitle(2);
      let actualDescription = user.getTodoDescription(2);
      let expectedTitle = 'office';
      let expectedDescription = 'sleep';
      assert.equal(actualTitle, expectedTitle);
      assert.equal(actualDescription, expectedDescription);
    })
  })

  describe('#deleteTodo()', () => {
    it('should delete the todo of given user', () => {
      user.addTodo('office', 'sleep');
      user.deleteTodo(1);
      let actual = user.getAllTodos();
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
    it('should return the specific task of specific todo of given user', () => {
      let actual = user.getTask(1, 1);
      let expected = {
        title: 'to eat',
        status: false
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#editTask()', () => {
    it('should edit the specific task of specific todo of given user', () => {
      user.editTask(1, 1, 'to sleep');
      let actual = user.getTask(1, 1)
      let expected = {
        title: 'to sleep',
        status: false
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#addTask()', () => {
    it('should add the given task to specific todo of given user', () => {
      user.addTask(1, 'to sleep');
      let actual = user.getTask(1, 2);
      let expected = {
        title: 'to sleep',
        status: false
      };
      assert.deepInclude(actual, expected);
    })
  })

  describe('#deleteTask()', () => {
    it('should delete the given task from specific todo of given user', () => {
      user.addTask(1, 'to sleep');
      user.deleteTask(1, 1);
      let actual = user.getAllTasks(1);
      let expected = {
        2: {
          title: 'to sleep',
          status: false
        }
      };
      assert.deepEqual(actual, expected);
      assert.doesNotHaveAnyKeys(actual, [1]);
    })
  })

  describe('#setTaskStatus()', () => {
    it('should set the status for given task from specific todo of given user as true', () => {
      user.setTaskStatus(1, 1, true);
      let actual = user.getTaskStatus(1, 1);
      let expected = true;
      assert.equal(actual, expected);
    })
  })

  describe('#setTaskStatus()', () => {
    it('should set the status for given task from specific todo of given user as false', () => {
      user.setTaskStatus(1, 1, false);
      let actual = user.getTaskStatus(1, 1);
      let expected = false;
      assert.equal(actual, expected);
    })
  })

  describe('#getAllTodos()', () => {
    it('should return the all todos from given user', () => {
      let actual = user.getAllTodos();
      let expected = {
        1: {
          title: 'pg',
          description: 'eat',
          taskSrNo: 2,
          tasks: {
            1: {
              status: false,
              title: 'to eat'
            }
          }
        }
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#getAllTasks()', () => {
    it('should return the all tasks from given user', () => {
      user.addTask(1,'to sleep');
      let actual = user.getAllTasks(1);
      let expected = {
        1: {
          title: 'to eat',
          status: false
        },
        2:{
          title: 'to sleep',
          status: false
        }
      };
      assert.deepEqual(actual, expected);
    })
  })

})
