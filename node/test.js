var jasmine = require('./jasmine');
var path = require('path');

var isVerbose = true;
var showColors = true;

process.argv.forEach(function(arg){
  switch(arg) {
    case '--color': showColors = true; break;
    case '--noColor': showColors = false; break;
    case '--verbose': isVerbose = true; break;
  }
});

jasmine.executeSpecsInFolder(path.join(__dirname, 'spec'), function(runner, log) {
  console.log("Testing finished");
}, isVerbose, showColors);

