var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var urlAdjuster = require('gulp-css-url-adjuster');

var sass_sources = ['./public/scss/**/*.scss'];
var templates_sources = ['./views/**/*.ejs'];

gulp.task('connect', function(){
    connect.server({
        root: [__dirname],
        port: 5354,
        livereload: true
    });
});

gulp.task('sass', function () {
    gulp.src(sass_sources)
        .pipe(sass())
        .pipe(urlAdjuster({
            prependRelative: '/dist/'
        }))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src(templates_sources)
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(sass_sources, ['sass']);
    gulp.watch(templates_sources, ['html']);
});

gulp.task('dev', ['connect', 'sass', 'watch']);
