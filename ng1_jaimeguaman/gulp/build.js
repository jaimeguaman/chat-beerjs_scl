'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', ['markups'], function () {
	return gulp.src([
		path.join(conf.paths.src, '/app/**/*.html'),
		path.join(conf.paths.tmp, '/serve/app/**/*.html')
	])
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe($.angularTemplatecache('templateCacheHtml.js', {
			module: 'beerjsChat',
			root: 'app'
		}))
		.pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials', 'ngConfig'], function () {
	if (conf.sourcemaps) {
		gutil.log(gutil.colors.yellow('*** BUILDING WITH SOURCEMAPS, THIS MAY TAKE A LITTLE MORE TIME ***'));
	} else {
		gutil.log(gutil.colors.yellow('*** BUILDING WITHOUT SOURCEMAPS ***'));
	}
	var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
	var partialsInjectOptions = {
		starttag: '<!-- inject:partials -->',
		ignorePath: path.join(conf.paths.tmp, '/partials'),
		addRootSlash: false
	};
	var htmlFilter = $.filter('*.html', { restore: true });
	var jsFilter = $.filter('**/*.js', { restore: true });
	var cssFilter = $.filter('**/*.css', { restore: true });
	var assets;
	let k = gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
		.pipe($.inject(partialsInjectFile, partialsInjectOptions))
		.pipe(assets = $.useref.assets())
		.pipe($.rev())
		.pipe(jsFilter);
	if (conf.sourcemaps) k = k.pipe($.sourcemaps.init());
	k = k.pipe($.ngAnnotate())
		.pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'));
	if (conf.sourcemaps) k = k.pipe($.sourcemaps.write('maps'));
	k = k.pipe(jsFilter.restore)
		.pipe(cssFilter);
	if (conf.sourcemaps) k = k.pipe($.sourcemaps.init());
	k = k.pipe($.replace('../../bower_components/material-design-iconfont/iconfont/', '../fonts/'))
		.pipe($.minifyCss({ processImport: false }));
	if (conf.sourcemaps) k = k.pipe($.sourcemaps.write('maps'));
	k = k.pipe(cssFilter.restore)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.revReplace())
		.pipe(htmlFilter)
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true,
			conditionals: true
		}))
		.pipe(htmlFilter.restore)
		.pipe(gulp.dest(path.join(conf.paths.dist, '/')))
		.pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
	return gulp.src($.mainBowerFiles().concat('bower_components/material-design-iconfont/iconfont/*'))
		.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
	var fileFilter = $.filter(function (file) {
		return file.stat.isFile();
	});

	return gulp.src([
		path.join(conf.paths.src, '/**/*'),
		path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss,jade}')
	])
		.pipe(fileFilter)
		.pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('assets', function () {
	return gulp.src([
		path.join(conf.paths.src, '/assets/**/*')
	])
		.pipe(gulp.dest(path.join(conf.paths.dist, '/assets')));
});

gulp.task('clean', function () {
	return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'fonts', 'other', 'assets']);
