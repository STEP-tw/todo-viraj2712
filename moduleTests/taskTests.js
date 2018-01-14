const assert = require('chai').assert;
const Task = require('../srcModules/task.js');

var task;

describe('Task', () => {

  beforeEach(() => {
    task = new Task('to eat');
  })

  describe('#getTask()', () => {
    it('should return the title of task', () => {
      let actual = task.getTask();
      let expected = 'to eat';
      assert.equal(actual, expected);
    })
  })

  describe('#setTask()', () => {
    it('should change the title of task', () => {
      let actual = task.setTask('to sleep');
      let expected = 'to sleep';
      assert.equal(actual, expected);
    })
  })

  describe('#setStatus()', () => {
    it('should set the status to task as true', () => {
      let actual = task.setStatus(true);
      let expected = true;
      assert.equal(actual, expected);
    })
  })

  describe('#setStatus()', () => {
    it('should set the status to task as false', () => {
      let actual = task.setStatus(false);
      let expected = false;
      assert.equal(actual, expected);
    })
  })

  describe('#getStatus()', () => {
    it('should return the status of task as false', () => {
      let actual = task.getStatus();
      let expected = false;
      assert.equal(actual, expected);
    })
  })

  describe('#getStatus()', () => {
    it('should return the status of task as true', () => {
      task.setStatus(true);
      let actual = task.getStatus();
      let expected = true;
      assert.equal(actual, expected);
    })
  })

})
