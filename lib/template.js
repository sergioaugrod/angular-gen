var _ = require('lodash');

var template = module.exports;

template.compileTemplate = function(source, target) {
  return _.template(source)(target);
};
