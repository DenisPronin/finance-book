var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var urlAdjuster = require('gulp-css-url-adjuster');

var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var  open = require ('gulp-open');
var nodemon = require('gulp-nodemon');

var sources = {
    js: {
        dev: ['./public/js/app/app.js', './public/js/app/**/*.js'],
        build: './public/build/js'
    },
    sass: {
        dev: ['./public/scss/**/*.scss'],
        main: ['./public/scss/app.scss', './public/scss/landing/landing.scss'],
        build: './public/build/css'
    },
    server: {
        main: ['.server/**/*.js']
    },
    templates: ['./views/**/*.ejs', './public/js/**/*.html']
};

gulp.task('connect', function(){
    connect.server({
        root: [__dirname],
        port: 5354,
        livereload: true
    });
});

gulp.task("open", function(){
    gulp.src("views/landing.ejs")
        .pipe(open("", {
            url: "http://localhost:5353",
            app: "google-chrome"
        }));
});

gulp.task('sass', function () {
    gulp.src(sources.sass.main)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(urlAdjuster({
            prependRelative: '/build/'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
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
        .pipe(gulp.dest(sources.js.build))
        .pipe(connect.reload());
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

gulp.task('server_lint', function() {
    gulp.src(sources.server.main)
        .pipe(jshint());
});

gulp.task('server', function () {
    nodemon({ script: 'server.js', ext: 'js', ignore: ['ignored.js'] })
        .on('change', ['server_lint'])
        .on('restart', function () {
            console.log('restarted!');
            connect.reload();
        });
});

gulp.task('dev', ['connect', 'scripts', 'sass', 'watch', 'open']);
