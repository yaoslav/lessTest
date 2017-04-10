//var gulp = require('gulp');
//var concat = require('gulp-concat-css');
//var connect = require('gulp-connect');
//var htmlreplace = require('gulp-html-replace');
//var htmlincluder = require('gulp-htmlincluder');
//var livereload = require('gulp-livereload');
//var spritesmith = require('gulp.spritesmith');
//
//gulp.task('sprit',function(){
//var spriteData	= gulp.src("dev/img/icons/*.png").pipe(spritesmith({
//
//imgName:'sprite.png',
//	cssName:'sprite.css',
//	algorithm: 'binary-tree'
//}));
//	spriteData.img.pipe(gulp.dest('build/img/'));
//	spriteData.css.pipe(gulp.dest('build/css/'));
//});
//gulp.task('server',function(){
//connect.server({
//	root: 'build',
//	livereload:true
//});
// 
//});
//gulp.task('css',function(){
//gulp.src('dev/css/**/*. css')
//	.pipe(concat('style.css'))
//	.pipe(gulp.dest('build/css'))
//	.pipe(connect.reload());
//});
//gulp.task('html',function(){
//gulp.src('dev/**/*. html')
//	.pipe(htmlincluder())
//.pipe(htmlreplace({ 
//	css:'css/stele.css'
//
//}))
//	.pipe(gulp.dest('build/'))
//	.pipe(connect.reload());
//
//});
//
//
//gulp.task('default', function(){
//gulp.start('css','html','server');
//gulp.watch(['dev/css/**/*.css'],function (){
//gulp.start('css');
//})
//gulp.watch(['dev/**/*.html'],function(){
//gulp.start('html');
//})
//});
var gulp = require('gulp');
var connect = require('gulp-connect');
var replace = require('gulp-html-replace');
var includer = require('gulp-htmlincluder');
var livereload = require('gulp-livereload');
var spritecreator = require('gulp.spritesmith');
var less = require('gulp-less');

gulp.task('sprite', function(){
	var spriteData = gulp.src('dev/img/icons/*.png')
.pipe(spritecreator({
	imgName: 'sprite.png',
	cssName: 'sprite.css',
	algorithm: 'binary-tree'
}));
	spriteData.img.pipe(gulp.dest('build/img/'));
	spriteData.css.pipe(gulp.dest('build/css/'));
});

gulp.task('server', function(){
	connect.server({
		root : 'build',
		livereload: true
	});
});
gulp.task('css', function(){
	gulp.src('dev/less/general.less')
	 	.pipe(less())
		.pipe(gulp.dest('build/css/'))
		.pipe(connect.reload());
});
gulp.task('html', function(){
	gulp.src('dev/**/*.html')
		.pipe(includer())
		.pipe(replace({
			css: 'css/style.css'
		}))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});
gulp.task('default', function(){
	gulp.start('css', 'html', 'server');

	gulp.watch(['dev/less/**/*.less'], function(){
		gulp.start('css');
	});
	gulp.watch(['dev/**/*.html'], function(){
		gulp.start('html');
	});
});