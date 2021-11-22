// Modules & Plugins
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	imagemin = require('gulp-imagemin'),
	imageminMozjpeg = require('imagemin-mozjpeg'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload'),
	zip = require('gulp-zip'),
	babel = require('gulp-babel'),
	minify = require('gulp-minify'),
	notify = require("gulp-notify");

// HTML Task
gulp.task('html', function () {
	return gulp.src('project/pug/index.pug')
		.pipe(pug())
		.pipe(gulp.dest('dist'))
		//.pipe(notify("Html Task Is Done"))
		.pipe(livereload());
});

// Styles Task
gulp.task('styles', function () {
	return gulp.src('project/scss/*.scss', 'project/scss/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions', {
			cascade: true
		}))
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'))
		//.pipe(notify("Css Task Is Done"))
		.pipe(livereload());
});

// Scripts Task
gulp.task('scripts', function () {
	return gulp.src('project/js/*.js', 'project/js/**/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify())
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		//.pipe(notify("JS Task Is Done"))
		.pipe(livereload());
});

// Images Task
gulp.task('images', function () {
	return gulp.src('project/img/*', 'project/img/**/*')
		.pipe(imagemin([
			imageminMozjpeg({
				quality: 10
			})
		]))
		.pipe(gulp.dest('dist/img'))
		//.pipe(notify("Images Task Is Done"))
		.pipe(livereload());
});

// Compress Files
gulp.task('compress', function () {
	return gulp.src('dist/**/*.*')
		.pipe(zip('Template.zip'))
		.pipe(gulp.dest('.'));
		//.pipe(notify("Files Is Compressed"));
});

// Watch Task
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('project/pug/**/*.pug', gulp.series('html'));
	gulp.watch('project/scss/**/*.scss', gulp.series('styles'));
	gulp.watch('project/js/**/*.js', gulp.series('scripts'));
	gulp.watch('project/img/*', gulp.series('images'));
	gulp.watch('dist/**/*.*', gulp.series('compress'));
});

// Defaut Task
gulp.task('default', gulp.parallel('html', 'styles', 'scripts', 'images', 'compress', 'watch'));