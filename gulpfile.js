var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var urlAdjuster = require('gulp-css-url-adjuster');

var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

var sources = {
    js: {
        dev: ['./public/js/app/app.js', './public/js/app/**/*.js'],
        build: './public/build/js'
    },
    sass: {
        dev: ['./public/scss/**/*.scss'],
        build: './public/build/css'
    },
    templates: ['./views/**/*.ejs']
};

gulp.task('connect', function(){
    connect.server({
        root: [__dirname],
        port: 5354,
        livereload: true
    });
});

gulp.task('sass', function () {
    gulp.src(sources.sass.dev)
        .pipe(sass())
        .pipe(urlAdjuster({
            prependRelative: '/build/'
        }))
        .pipe(gulp.dest(sources.sass.build))
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
    gulp.src(sources.js.dev)
        .pipe(jshint())
        .pipe(sourcemaps.init())
        .pipe(concat("app-finance.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sources.js.build));
});

gulp.task('html', function () {
    gulp.src(sources.templates)
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(sources.sass.dev, ['sass']);
    gulp.watch(sources.templates, ['html']);
    gulp.watch(sources.js.dev, ['scripts']);
});

gulp.task('dev', ['connect', 'scripts', 'sass', 'watch']);
