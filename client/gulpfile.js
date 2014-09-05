var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
gulp.task('default', function(){

});

gulp.task('lint', function(){
	return gulp.src('./js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function(){
	return gulp.watch('./js/**/*.js', ['lint']);
});