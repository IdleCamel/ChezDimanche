var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('src/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css/'));
});


gulp.task('deploy', function() {
  console.log('deploy task running');
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    //.pipe($.concat('app.js'))
    .pipe(gulp.dest('dist/js/'))
    //.pipe($.uglify());
  // src
  // concatenate
  // lint
  // minify/uglify
});

gulp.task('markup', function() {
  return gulp.src('src/index.html')
    .pipe($.useref())
    .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
  return gulp.src('src/img/*.*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy', function() {
  return gulp.src('src/js/**/*.js')
    .pipe($.copy('dist/js'));
  gulp.src('src/img/**/*.+(jpg|JPG|svg)')
    .pipe($.copy('dist/img'));
  return gulp.src('index.html')
    .pipe($.copy('dist'));
});

gulp.task('build', [
  'sass',
  'scripts',
  'markup',
  'images'
]);

gulp.task('watch', function() {
  // TO DO
});

gulp.task('serve', function() {
  // TO DO
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
