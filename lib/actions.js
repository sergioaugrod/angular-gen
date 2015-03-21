var fs = require('fs');
var fsExtra = require('fs-extra');
var path = require('path');
var config = require('./config');

var actions = module.exports;

actions.createDirectory = function(name) {
  if(!fs.existsSync(name)) {
    fs.mkdirSync(name);
  }
};

actions.copyFolderFiles = function(src, dest) {
  config.paths.files.forEach(function(file){
    if(!fs.existsSync(path.join(dest, file))) {
      fsExtra.copySync(path.resolve(__dirname, '..', path.join(src, file)), path.join(dest, file));
    }
  });
};

actions.copyFile = function(src, dest, fileName) {
  if(!fs.existsSync(path.join(dest, fileName))) {
    fsExtra.copySync(path.resolve(__dirname, '..', path.join(src, fileName)), path.join(dest, fileName));
  }
};

actions.createFolders = function(dest) {
  config.paths.folders.forEach(function(folder){
    if(!fs.existsSync(path.join(dest, folder))) {
      actions.createDirectory(path.join(dest, folder));
    }
  });
};

actions.deleteFolder = function(name) {
  if (fs.existsSync(name)) {
    fs.readdirSync(name).forEach(function(file) {
      fs.unlinkSync(path.join(name, file));
    });
  }
  fs.rmdirSync(name);
};

actions.copyFolder = function(src, dest) {
  if(!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  fs.readdirSync(path.resolve(__dirname, '..', src)).forEach(function(file){
    fsExtra.copySync(path.resolve(__dirname, '..', path.join(src, file)), path.join(dest, file));
  });
};

actions.renameFiles = function(directoryName, prefixName) {
  fs.readdirSync(directoryName).forEach(function(file){
    if(file.split("sample").length > 1) {        
      var pathFile = path.join(directoryName, file);
      var newFile = prefixName + file.split("sample")[1];
      fs.renameSync(pathFile, path.join(directoryName, newFile));
    }
  });
};

actions.renameSuffixFiles = function(directoryName, suffixName) {
  fs.readdirSync(directoryName).forEach(function(file){
    if(file.split("sample").length > 1) {        
      var pathFile = path.join(directoryName, file);
      var newFile = file.split("sample")[0] + suffixName + ".js";
      fs.renameSync(pathFile, path.join(directoryName, newFile));
    }
  });
};

actions.fileToString = function(src) {
  if(fs.existsSync(src)) {
    return fs.readFileSync(src, "utf-8");
  } else {
    return '';
  }
};

actions.stringToFile = function(dest, contents) {
  if(fs.existsSync(dest)) {
    return fs.writeFileSync(dest, contents, 'utf-8');
  } else {
    return '';
  }
};
