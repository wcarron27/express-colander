const gulp = require('gulp')
const babel = require('gulp-babel')
const minify = require('gulp-minify')

gulp.task('default', ['build'])

gulp.task('build', function() {
  return gulp.src('src/colander.js')
    .pipe(babel())
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('dist'))
})
