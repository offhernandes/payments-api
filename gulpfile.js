const gulp = require('gulp')
const browserSync = require('browser-sync').create()

gulp.task('serve', () => {
  browserSync.init({ server: { baseDir: './src/views/' } })

  gulp.watch('./src/views/*.html').on('change', browserSync.reload)
})
