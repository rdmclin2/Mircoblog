var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  serverjs: ['models/*.js', 'routes/*.js','./*.js'],
  webjs :['public/javascripts/*.js']
};

gulp.task('lint',function () {
  gulp.src(paths.serverjs)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

// gulp.task('sass',function () {
//     gulp.src('./scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('./css'));
// });

gulp.task('scripts',function () {
  gulp.src(paths.webjs)
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./dist'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
});

gulp.task('watch',function () {
  gulp.watch(paths.serverjs,function () {
    gulp.run('lint');
  });
});

gulp.task('default',function () {
  // 将你的默认的任务代码放在这
  gulp.run('lint','scripts');

});
