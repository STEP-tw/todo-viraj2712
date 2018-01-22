let utility={};

utility.toS = o => JSON.stringify(o, null, 2);

utility.isGetMethod = req => req.method == 'GET';

utility.isFile = (fs,path) => fs.existsSync(path);

utility.getFileContent = (fs,path) => fs.readFileSync(path, 'utf8');

utility.getContentType = (fileName) => {
  let fileExtension = fileName.slice(fileName.lastIndexOf('.'));
  let extensions = {
    '.gif': 'image/gif',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.pdf': 'application/pdf',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
  };
  return extensions[fileExtension];
}

utility.parseData = (data) => {
  data = data.replace(/\+/g, " ");
  return decodeURIComponent(data);
};

module.exports=utility;
