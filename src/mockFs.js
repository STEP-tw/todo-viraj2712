class MockFs {
  constructor() {
    this.files = {};
  }
  existsSync(fileName) {
    return this.files[fileName] != undefined;
  }
  addFile(fileName){
    this.files[fileName]="";
  }
  readFileSync(fileName, encoding) {
    if (!this.existsSync(fileName)) throw new Error('file not found');
    return this.files[fileName];
  }
  writeFileSync(fileName, data) {
    if (!this.existsSync(fileName)) throw new Error('file not found');
    return this.files[fileName] = data;
  }
}
module.exports = MockFs;
