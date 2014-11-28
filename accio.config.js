module.exports = {
  generators: {
    foo: {
      path: 'exampleGenerators/foo.js',
      output: function(name) {
        return ('exampleOutput/foo/foo_' + name + '.js');
      },
    },
  }
};
