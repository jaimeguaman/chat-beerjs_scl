var gulp = require('gulp');
var conf = require('./conf');
var gulpNgConfig = require('gulp-ng-config');
var fs = require('fs');
var packageJson = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('ngConfig', function () {
  gulp.src('environment.json')
    .pipe(gulpNgConfig('ENVIRONMENT',{
      environment: conf.env,
      constants: {
        VERSION: packageJson.version || '0.0.0'
      }
    }))
    .pipe(gulp.dest(conf.paths.src + '/app'))
});
