var     gulp        = require('gulp'),
        $           = require('gulp-load-plugins')(),
        browserSync = require('browser-sync').create(),
        path        = require('path'),
        fs          = require('fs');

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
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('deploy', ['build'], function() {
  console.log('deploy task running');
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    //.pipe($.concat('app.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
    //.pipe($.uglify());
  // src
  // concatenate
  // lint
  // minify/uglify
});

gulp.task('get-content', function() {
  return gulp.src('src/data/partials/*.json')
    .pipe($.mergeJson('bundle.json'))
    .pipe(gulp.dest('src/data/'));
});

gulp.task('pug-lint', function() {
  return gulp.src('src/data/markup/**/*.pug')
    .pipe($.pugLint());
});

gulp.task('markup', ['get-content', 'pug-lint'], function() {
  return gulp.src('src/markup/index.pug')
    .pipe($.data(function(file) {
      return require('./src/data/bundle.json');
    }))
    .pipe($.pug({
      pretty: true
    }))
    .pipe($.useref())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', function() {
  return gulp.src('src/img/*.+(png|jpg|svg)')
    .pipe($.cache($.imagemin()))
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

gulp.task('watch', ['build'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts', 'markup']);
  gulp.watch('src/markup/**/*.pug', ['markup']);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('serve', ['browser-sync', 'build', 'watch']);

gulp.task('default', ['sass'], function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
});
