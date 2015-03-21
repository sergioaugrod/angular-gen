var config = require('./config');
var utils = require('./utils');
var _ = require('lodash');

var Engine = require('./engine');
var Engine = new Engine();

var CLI = module.exports = function() {
  var init = function(name) {
    name = name.one;
    if(name) {
      try {            
        Engine.init(name, function() {
          utils.message.success("\n\nANGULAR-GEN ^.^: Created " + name + " project successful.");
        });
        return true;
      } catch(err) {
        utils.message.error("\nANGULAR-GEN ^.^ ERROR: " + err);
        return false;
      }
    } else {
      utils.message.error("\nANGULAR-GEN ^.^: You must submit the project name.");
      return false;
    }
  };

  var createModule = function(names) {
    names = names.many;
    if(names.length > 0) {
      try {
        Engine.createModule(names);
        if(names.split(":").length > 1) {
          names = names.split(":").join(" ");
        }
        utils.message.success("\nANGULAR-GEN ^.^: Module(s) " + names + " successfully created.");
        return true;
      } catch(err) {
        utils.message.error("\nANGULAR-GEN ^.^ ERROR: " + err);
        return false;
      }
    } else {
      utils.message.error("\nANGULAR-GEN ^.^: You must submit the module name.");
      return false;
    }
  };

  var createService = function(name) {
    name = name.one;
    if(name) {
      try {            
        Engine.createService(name);
        utils.message.success("\nANGULAR-GEN ^.^: Service " + name + " successfully created.");
        return true;
      } catch(err) {
        utils.message.error("\nANGULAR-GEN ^.^ ERROR: " + err);
        return false;
      }
    } else {
      utils.message.error("\nANGULAR-GEN ^.^: You must submit the service name.");
      return false;
    }
  };

  var createController = function(names) {
    names = names.many;
    if(names.length > 0) {
      try {            
        Engine.createController(names);
        if(names.split(":").length > 1) {
          names = names.split(":").join(":");
        }
        utils.message.success("\nANGULAR-GEN ^.^: Controller " + names + " successfully created.");
        return true;
      } catch(err) {
        utils.message.error("\nANGULAR-GEN ^.^ ERROR: " + err);
        return false;
      }
    } else {
      utils.message.error("\nANGULAR-GEN ^.^: You must submit the controller name.");
      return false;
    }
  };

  var createControllerFull = function(names) {
    names = names.many;
    if(names.length > 0) {
      try {            
        Engine.createFullController(names);
        if(names.split(":").length > 1) {
          names = names.split(":").join(":");
        }
        utils.message.success("\nANGULAR-GEN ^.^: Full Controller " + names + " successfully created.");
        return true;
      } catch(err) {
        utils.message.error("\nANGULAR-GEN ^.^ ERROR: " + err);
        return false;
      }
    } else {
      utils.message.error("\nANGULAR-GEN ^.^: You must submit the controller name.");
      return false;
    }
  };

  var run = function() {
    try {
      Engine.run();
      return true;
    } catch(err) {
      utils.message.error("\nANGULAR-GEN ^.^: " + err);
      return false;
    }
  };

  var commands = {
    "init": init,
    "module": createModule,
    "service": createService,
    "controller": createController,
    "controllerservice": createControllerFull,
    "run": run
  };

  this.start = function(args) {
    if(args.length > 0) {
      try {
        var many = args.slice(1).join(" "); 
        var command = {
          method: args[0],
          one: args[1],
          many: many
        };
        return commands[command.method](command);
      } catch(err) {
        utils.message.error("\nANGULAR-GEN ^.^: Incorrect command.");
        return false;
      }
    }
  };
};
