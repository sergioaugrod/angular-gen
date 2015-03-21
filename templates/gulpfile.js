var gulp = require('gulp');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var jade = require('gulp-jade');

var source = {
  dir: {
    styles: 'styles',
    app: 'app'
  },
  ext: {
    html: 'app/**/*.html',
    css: 'styles/*.css',
    less: 'styles/*.less',
    js: 'app/**/*.js',
    jade: 'app/**/*.jade'
  },
  file: {
    index: 'index.html',
    style: 'styles/style.less'
  }
};

gulp.task('less', function () {
  gulp.src(source.file.style)
    .pipe(less())
    .pipe(gulp.dest(source.dir.styles));
});

gulp.task('jade', function () {
  gulp.src(source.ext.jade)
  .pipe(jade())
  .pipe(gulp.dest(source.dir.app));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(source.ext.less, ['less']);
  gulp.watch([
    source.file.index,
    source.ext.js,
    source.ext.css,
    source.ext.html
  ]).on('change', function(event) {
    livereload.changed( event.path );
  });
});

gulp.task('default', ['watch', 'less', 'jade']);
