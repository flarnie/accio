module.exports = function(args) {
  var name = args[0];
  return ('module.exports = function() {\nconsole.log(\n"generated a foo named ' + name + '");}');
};
