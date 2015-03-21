var chalk = require('chalk');

var utils = module.exports;

utils.message = {};

utils.message.error = function(msg) {
  console.error(chalk.red.bold(msg));
};

utils.message.success = function(msg) {
  console.log(chalk.green.bold(msg));
};

utils.message.warning = function(msg) {
  console.warn(chalk.yellow.bold(msg));
};

utils.message.info = function(msg) {
  console.info(chalk.blue.bold(msg));
};

utils.message.log = function(msg) {
  console.log(chalk.cyan.bold(msg));
};
