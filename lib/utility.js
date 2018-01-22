let utility={};

utility.toS = o => JSON.stringify(o, null, 2);

utility.isGetMethod = req => req.method == 'GET';

utility.isFile = (fs,path) => fs.existsSync(path);

utility.getFileContent = (fs,path) => fs.readFileSync(path, 'utf8');

utility.getContentType = (fileName) => {
  let fileExtension = fileName.slice(fileName.lastIndexOf('.'));
  let extensions = {
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
  };
  return extensions[fileExtension];
}
utility.writeDataToFile = (fs,path,data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

module.exports=utility;
