var _ = require('lodash');

var normalize = module.exports;

normalize.capitalize = function(names) {
  var name = "";

  if(names.length > 1){
    name = [];
    names.forEach(function(_name){
      name.push(_.capitalize(_name));
    });
  }
  else
  {
    name = _.capitalize(names);
  }

  return name;
};
