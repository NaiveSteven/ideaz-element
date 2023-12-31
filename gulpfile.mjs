import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import fsExtra from 'fs-extra'

const { existsSync, emptyDir, mkdirSync } = fsExtra
const rootDir = resolve(fileURLToPath(import.meta.url), '..')
const __dirname = path.resolve()
const { dest, parallel, series, src } = gulp
const outputDir = resolve(__dirname, 'lib')
const cssDir = resolve(rootDir, 'lib')

function buildLibStyle() {
  ensureEmptyDir(cssDir)
  const sass = gulpSass(dartSass)

  return src(rootDir, 'packages/theme-chalk/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(cssDir))
}

function createPackageJson(name) {
  const fileStr = `{
  "name": "${name}",
  "version": "0.0.0",
  "main": "index.css",
  "module": "index.css",
  "style": "index.css"
}`

  fsExtra.outputFile(resolve(outputDir, 'package.json'), fileStr, 'utf-8')
}

// createPackageJson('theme-chalk')

function ensureEmptyDir(dir) {
  existsSync(dir) ? emptyDir(dir) : mkdirSync(dir)
}

export default parallel(series(buildLibStyle))
