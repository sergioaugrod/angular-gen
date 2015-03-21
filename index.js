#!/usr/bin/env node

////////////////////////
/// ANGULAR GENERATOR //
///////////////////////

var utils = require('./lib/utils');
var figlet = require('figlet');

var CLI = require('./lib/cli');
var CLI = new CLI();

var args = process.argv.slice(2);

figlet.text('ANGULAR-GEN', function(err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('\n');
  utils.message.warning(data);
  if(args.length >= 1) {
    CLI.start(args);
  } else {
    utils.message.error("Command Error.");
  }
});
