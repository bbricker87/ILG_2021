const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const { series, src, dest } = require('gulp');

var input = './scss/**/*.scss';
var output = './css/';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

function compileSass() {
  return src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions)).on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(dest(output))
  // .pipe(sassdoc(sassdocOptions))
  // .resume()
};

//Watch task
function watch() {
  watch(input, compileSass)
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
}

exports.build = compileSass;
exports.default = series(compileSass, watch);