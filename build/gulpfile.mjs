import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
// import fsExtra from 'fs-extra'

// const { existsSync, emptyDir, mkdirSync } = fsExtra
const rootDir = resolve(fileURLToPath(import.meta.url), '..', '..')
const __dirname = path.resolve()
const { dest, parallel, series, src } = gulp
// const outputDir = resolve(__dirname, 'lib')
const outputLibDir = resolve(rootDir, 'lib/theme-chalk')
const outputEsDir = resolve(rootDir, 'es/theme-chalk')

function buildLibStyle() {
  // ensureEmptyDir(outputLibDir)
  const sass = gulpSass(dartSass)

  return src('../packages/theme-chalk/src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(outputLibDir))
    .pipe(dest(outputEsDir))
}

// function ensureEmptyDir(dir) {
//   existsSync(dir) ? emptyDir(dir) : mkdirSync(dir)
// }

export default parallel(series(buildLibStyle))
