const assert = require('chai').assert;
const MockFs = require('../src/mockFs');

var mockFs;

describe('mockFs', () => {

  beforeEach(() => {
    mockFs = new MockFs();
  })

  describe('#addFile()', () => {
    it('should add file', () => {
      mockFs.addFile('good');
      assert.include(mockFs.files, {
        'good': ''
      });
    })
    it('should not have the file if did not added', () => {
      assert.notInclude(mockFs.files, {
        'good': ''
      });
    })
  })

  describe('#existsSync()', () => {
    it('should check whether file exists or not', () => {
      mockFs.addFile('good');
      assert.ok(mockFs.existsSync('good'));
      assert.notOk(mockFs.existsSync('bad'));
    })
  })

  describe('#readFileSync()', () => {
    it('should return the file content if file exists', () => {
      mockFs.addFile('good');
      assert.equal(mockFs.readFileSync('good'), '');
    })
    it('should throw error if file does not exists', () => {
      assert.throws(() => {
        mockFs.readFileSync('good')
      }, 'file not found');
    })
  })

  describe('#writeFileSync()', () => {
    it('should write the given content to file if file exists', () => {
      mockFs.addFile('good');
      mockFs.writeFileSync('good', 'fileContent')
      assert.equal(mockFs.files['good'], 'fileContent');
    })
    it('should throw error if file does not exists', () => {
      assert.throws(() => {
        mockFs.writeFileSync('good', 'fileContent')
      }, 'file not found');
    })
  })
})
