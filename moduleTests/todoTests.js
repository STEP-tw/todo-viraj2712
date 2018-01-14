const assert = require('chai').assert;
const Todo = require('../srcModules/todo.js');

var todo;

describe('Todo', () => {

  beforeEach(() => {
    todo = new Todo('pg', 'eat');
    todo.addTask('to eat');
  })

  describe('#getTitle()', () => {
    it('should return the title of todo', () => {
      let actual = todo.getTitle();
      let expected = 'pg';
      assert.equal(actual, expected);
    })
  })

  describe('#editTitle()', () => {
    it('should edit the title of todo', () => {
      let actual = todo.editTitle('office');
      let expected = 'office';
      assert.equal(actual, expected);
    })
  })

  describe('#getDescription()', () => {
    it('should return the description of todo', () => {
      let actual = todo.getDescription();
      let expected = 'eat';
      assert.equal(actual, expected);
    })
  })

  describe('#editDescription()', () => {
    it('should edit the description of todo', () => {
      let actual = todo.editDescription('sleep');
      let expected = 'sleep';
      assert.equal(actual, expected);
    })
  })

  describe('#getTask()', () => {
    it('should return the specific task from todo', () => {
      let actual = todo.getTask(1);
      let expected = {
        title: 'to eat',
        status: false
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#addTask()', () => {
    it('should add the task in todo', () => {
      todo.addTask('to sleep')
      let actual = todo.getTask(2);
      let expected = {
        title: 'to sleep',
        status: false
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#editTask()', () => {
    it('should edit the specific task in todo', () => {
      todo.editTask(1, 'to sleep');
      let actual = todo.getTask(1);
      let expected = {
        title: 'to sleep',
        status: false
      };
      assert.deepEqual(actual, expected);
    })
  })

  describe('#deleteTask()', () => {
    it('should delete the specific task from todo', () => {
      todo.addTask('to sleep');
      let actual = todo.getAllTasks();
      todo.deleteTask(1);
      let expected = {
        2: {
          title: 'to sleep',
          status: false
        }
      };
      assert.deepInclude(actual, expected);
      assert.doesNotHaveAnyKeys(actual, [1]);
    })
  })

  describe('#setTaskStatus()', () => {
    it('should set the status to specific task from todo as true', () => {
      todo.setTaskStatus(1, true);
      let actual = todo.getTaskStatus(1);
      let expected = true;
      assert.equal(actual, expected);
    })
  })

  describe('#setTaskStatus()', () => {
    it('should set the status to specific task from todo as false', () => {
      todo.setTaskStatus(1, false);
      let actual = todo.getTaskStatus(1);
      let expected = false;
      assert.equal(actual, expected);
    })
  })

  describe('#getAllTasks()', () => {
    it('should return the all tasks from todo', () => {
      let actual = todo.getAllTasks();
      let expected = {
        1: {
          title: 'to eat',
          status: false
        }
      };
      assert.deepInclude(actual, expected);
    })
  })

})
