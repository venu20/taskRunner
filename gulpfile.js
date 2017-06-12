const gulp = require('gulp');
const babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', () => {
    return gulp.src('index.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('dist'));
})