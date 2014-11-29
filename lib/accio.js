#! /usr/bin/env node

var fs = require('fs');

var processCommandlineArguments = function(args) {
  var processedArgs = {};
  var userArgs = args.slice(2);
  processedArgs.name = userArgs.shift();
  processedArgs.args = userArgs;
  return processedArgs;
};

var generatorOptions = processCommandlineArguments(process.argv);
console.log('Running generator: ', generatorOptions.name);
console.log('with args of', generatorOptions.args);

// Find the generator of that name using the config file
var currentWorkingDir = process.cwd();
var findGenerator = function(generatorName) {
  var userAccioConfigs = require(currentWorkingDir + '/accio.config.js');
  // check to see if it is aliased
  var foundAlias = userAccioConfigs.aliases[generatorName];
  if (foundAlias) {
    generatorName = foundAlias;
  }
  // TODO: throw if no configs found and/or
  // Add default configs
  var foundGeneratorConfig = userAccioConfigs.generators[generatorName];
  if (foundGeneratorConfig) {
    return foundGeneratorConfig;
  }
  throw new Error(('No configuration found for generator ' + generatorName));
};

var generatorConfigs = findGenerator(generatorOptions.name);
var generator = require(currentWorkingDir + generatorConfigs.path);

// Pass it the arguments
// TODO: escape the arguments before passing them to the generators
// TODO: add configs to turn off the automatic escapting
var generatedOutput = generator(generatorOptions.args);

// Save the result to the path specified in the config file for that generator
var outputPath = currentWorkingDir + (
    generatorConfigs.output(generatorOptions.args[0])
);
fs.writeFile(outputPath, generatedOutput, function(err) {
  if (err) throw err;
  console.log('Generated file in ', outputPath);
});
