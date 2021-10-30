const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sassdoc = require('sassdoc');

var input = 'user/themes/fbc_2020/scss/**/*.scss';
var output = 'user/themes/fbc_2020/css/';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var autoprefixerOptions = {
  browsers: ['last 2 versions', '>5%', 'Firefox ESR']
};
var sassdocOptions = {
  dest: 'user/themes/fbc_2020'
}

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions)).on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
  // .pipe(sassdoc(sassdocOptions))
  // .resume()
});

//Default task
gulp.task('default', ['sass', 'watch']);

//Watch task
function watch() {
  watch(input, sass())
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
}

// Production Build
gulp.task('prod', function () {
  return gulp
    .src(input)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});

exports.watch =