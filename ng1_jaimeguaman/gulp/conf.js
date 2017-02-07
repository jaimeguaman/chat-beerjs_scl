/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');
var argv = require('yargs').argv;

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};


if(!argv.env){
  gutil.log(gutil.colors.yellow('You didn`t specified environment. tasks will use local environment by default'));
  gutil.log(gutil.colors.yellow('If you want to specify environment run the desired tasks with --env argument'));
  gutil.log(gutil.colors.yellow('Supported environments are: local, development and production'));
}else{
  gutil.log(gutil.colors.green('Tasks will use environment:' + argv.env));
}

/**
 *  environment
 */
exports.env = argv.env || 'local';
exports.sourcemaps = argv.sourcemaps ?  true : false;



/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/jquery/, /foundation/],
  directory: 'bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
