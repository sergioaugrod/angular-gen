var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var config = require('./config');
var utils = require('./utils');
var exec = require('child_process').exec;

var Engine = module.exports = function Engine() {
  var self = this;
  this.initFile = ".ag";
  this.pathApp = "app";
  this.pathtemplate = "templates";	
  this.templateController = path.join(this.pathtemplate, 'controller');
  this.templateModule = path.join(this.pathtemplate, 'module');
  this.templateService = path.join(this.pathtemplate, 'services');
  this.templateStyle = path.join(this.pathtemplate, 'services');

  //.ag
  this.isInitiliazed = function() {
    var pathFileInit = path.join(__dirname ,this.initFile);
    return fs.existsSync(pathFileInit);
  };

  this._changeToProjectDirectory = function(name, callback) {
    child = exec('cd ' + name,
        function (error, stdout, stderr) {
          if (error !== null)
            utils.message.error(error);
          if(callback)
            callback();
        }
        );
  };

  this._nodeModulesInstall = function(name, callback) {
    utils.message.info("\nInstalling node modules... Please wait a moment!");
    child = exec('cd ' + name + ' && npm install',
        function (error, stdout, stderr) {
          utils.message.error(stderr);
          utils.message.log(stdout);
          utils.message.success('Node modules successfully installed.');
          if (error !== null)
            utils.message.error(error);
          if(callback)
            callback(name);
        }
        );		
  };

  this._bowerComponentsInstall = function(name, callback) {
    utils.message.info("\n\nInstalling bower components... Please wait a moment!");
    child = exec('cd ' + name + ' && bower install',
        function (error, stdout, stderr) {
          utils.message.error(stderr);
          utils.message.log(stdout);
          utils.message.success('Bower components successfully instaled.');
          if (error !== null)
            utils.message.error(error);
          if(callback)
            callback();
        }
        );
  };

  this._executeGulp = function() {
    utils.message.info("\nExecuting GULP...");
    child = exec('gulp',
        function (error, stdout, stderr) {
          utils.message.error(stderr);
          utils.message.log(stdout);
          if (error !== null)
            utils.message.error(error);
        }
        );
  };

  this._resolveNames = function(names){
    var module = this.fileToString(this.initFile);

    var name = names;
    var subNames = names.split(':');
    var dest = path.join('app', name);

    if(subNames.length > 1){
      name = this.capitalize(subNames).join('.');
      var fileName = subNames.pop();
      module = _.last(subNames);

      if(fileName == module)
      {
        var tempName = name.split('.');
        tempName.pop();
        name = tempName.join('.');
      }

      dest = path.join('app', subNames.join('\\').replace(/ /g,''));
    }

    return {"dest":dest.toLowerCase(), "module": _.capitalize(module) ,"fileName": name.toLowerCase(), "name": _.capitalize(name.replace('-','').replace(/\./g,''))};
  };

  this.execute = function(template, names){
    var ret = this._resolveNames(names);
    this.copyFolder(template, ret.dest);

    fs.readdirSync(ret.dest).forEach(function(file){
      if(file.split("sample").length > 1) {   

        var _path = path.join(ret.dest, file);   
        var result = self.fileToString(_path);
        var compiled = self.compileTemplate(result, {"moduleName": ret.module , "name": ret.name});
        self.stringToFile(_path, compiled);

      }
    });

    this.renameFiles(ret.dest, ret.fileName);
  };

};

_.extend(Engine.prototype, require('./actions'));
_.extend(Engine.prototype, require('./template'));
_.extend(Engine.prototype, require('./normalize'));


Engine.prototype.init = function(name, callback) {
  this.createDirectory(name);
  fs.writeFileSync(path.join(name, this.initFile), name);
  this.createFolders(name);
  this.copyFolderFiles(this.pathtemplate, name);
  var self = this;
  this._nodeModulesInstall(name, function() {
    self._bowerComponentsInstall(name, callback);
  });
};

Engine.prototype.createModule = function(names) {
  this.execute(this.templateModule, names);
};

Engine.prototype.createService = function(name) {

  var module = this.fileToString(this.initFile);
  var dest = path.join('app','services');
  var pathTemp = path.join(dest, 'service.sample.js');

  if(!fs.existsSync(path.join(dest, "service.module.js"))) {
    this.copyFile(this.templateService, dest, 'service.module.js');
  }

  this.copyFile(this.templateService, dest, 'service.sample.js');

  var result = this.fileToString(pathTemp);
  var compiled = this.compileTemplate(result, {"moduleName": "app.Service" , "name":  _.capitalize(name.toLowerCase())});
  this.stringToFile(path.join(dest, 'service.sample.js'), compiled);
  this.renameSuffixFiles(dest, name.toLowerCase());
};

Engine.prototype.createController = function(names) {
  this.execute(this.templateController, names);
};

Engine.prototype.createFullController = function(names) {
  this.execute(this.templateController, names);
  var obj = this._resolveNames(names);
  this.createService(obj.name);
};

Engine.prototype.run = function() {
  if(this.isInitiliazed) {
    this._executeGulp();
  } else {
    throw "The project wasnt created or not you arent in this folder.";
  }
};
