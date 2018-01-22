const assert = require('chai').assert;
const MockFs = require('../src/mockFs.js');
let fs={};
const lib = require('../lib/utility.js');
beforeEach(()=>{
  fs=new MockFs();
})
describe("Utility()",()=>{
  describe("#toS",()=>{
    it("should convert a empty object into a JSON string",()=>{
      let actual=lib.toS({});
      let expected='{}';
      assert.equal(actual,expected);
    });
    it("should convert a non-empty object into a JSON string",()=>{
      let actual=lib.toS({country:"india"});
      let expected='{\n  "country": "india"\n}';
      assert.equal(actual,expected);
    });
  });
  describe("#isGetMethod()",()=>{
    it("should tells whether the value of method is GET or not",()=>{
      let getRequest={
        method:"GET"
      }
      let postRequest={
        method:"POST"
      }
      assert.isOk(lib.isGetMethod(getRequest));
      assert.isNotOk(lib.isGetMethod(postRequest));
    });
  });
  describe("#isFile()",()=>{
    it("should tell whether the file exists or not",()=>{
      fs.addFile('./dummy');
      assert.ok(lib.isFile(fs,'./dummy'));
      assert.isNotOk(lib.isFile(fs,'./mummy'));
    });
  })
  describe("#getFileContent()",()=>{
    it("should give fileContent if File exists",()=>{
      fs.addFile('./dummy');
      assert.equal(lib.getFileContent(fs,'./dummy',"utf8"),"");
    });
    it("should throwError if File doesnt exists",()=>{
      assert.throws(()=>{
        lib.getFileContent(fs,'./dummy',"utf8")
      },'file not found');
    });
  });
  describe("#getContentType()",()=>{
    it("should return content type of given file",()=>{
      assert.equal(lib.getContentType('file.jpg'),'image/jpg');
      assert.equal(lib.getContentType('file.png'),'image/png');
      assert.equal(lib.getContentType('file.ico'),'image/x-icon');
      assert.equal(lib.getContentType('file.html'),'text/html');
      assert.equal(lib.getContentType('file.js'),'text/javascript');
      assert.equal(lib.getContentType('file.css'),'text/css');
      assert.equal(lib.getContentType('file.extension'),undefined);
    });
  });
  describe("#writeDataToFile()",()=>{
    it("should set fileContent if File exists",()=>{
      fs.addFile('./file');
      lib.writeDataToFile(fs,'./file','ok')
      assert.equal(fs.files['./file'],'"ok"');
    });
    it("should throwError if File doesnt exists",()=>{
      assert.throws(()=>{
        lib.writeDataToFile(fs,'./file',"ok")
      },'file not found');
    });
  })
});
