var isparta = require('isparta');
var metaljs = require('metaljs');

var babelOptions = {
  resolveModuleSource: metaljs.renameAlias,
  sourceMap: 'both'
};

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs'],

    files: [
      'bower_components/soyutils/soyutils.js',
      'bower_components/metaljs/src/**/*.js',
      'bower_components/aui-component/src/**/*.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'src/!(*.soy).js': ['coverage', 'commonjs'],
      'src/*.soy.js': ['babel', 'commonjs'],
      'bower_components/metaljs/**/*.js': ['babel', 'commonjs'],
      'bower_components/aui-component/**/*.js': ['babel', 'commonjs'],
      'test/**/*.js': ['babel', 'commonjs']
    },

    browsers: ['Chrome'],

    reporters: ['coverage', 'progress'],

    babelPreprocessor: {options: babelOptions},

    coverageReporter: {
      instrumenters: {isparta : isparta},
      instrumenter: {'**/*.js': 'isparta'},
      instrumenterOptions: {isparta: {babel: babelOptions}},
      reporters: [
        {type: 'html'},
        {type: 'lcov', subdir: 'lcov'},
        {type: 'text-summary'}
      ]
    }
  });
}
