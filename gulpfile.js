const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const gulp = require('gulp');
const babel = require('gulp-babel');
const cached = require('gulp-cached');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');

const paths = {
  dist: './docs',
  src: {
    js: './src/**/*.js',
    sass: './src/**/*.sass',
    pug: './src/**/*.pug',
  },
};

gulp.task('pug', () => {
  return gulp.src(paths.src.pug)
    .pipe(plumber())
    .pipe(cached('pug'))
    .pipe(pug())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  const preprocessor = [
    atImport(),
    cssnext({ browsers: ['> 1%', 'last 2 versions'] }),
    cssnano({ autoprefixer: false }),
  ];

  return gulp.src(paths.src.sass)
    .pipe(plumber())
    .pipe(cached('sass'))
    .pipe(sass()).on('error', sass.logError)
    .pipe(postcss(preprocessor))
    .pipe(rename({ suffix: 'min' }))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('babel', () => {
  return gulp.src(paths.src.js)
    .pipe(plumber())
    .pipe(cached('js'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['pug', 'sass'], () => {
  browserSync.init({
    server: paths.dist,
    open: false,
  });

  gulp.watch(paths.src.pug, ['pug']);
  gulp.watch(paths.src.sass, ['sass']);
});

gulp.task('default', ['serve'], () => {
  console.log('gulp is running...');
});
