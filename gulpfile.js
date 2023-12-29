import path from 'node'
import { dest, series, src } from 'gulp'
import sass from 'gulp-dart-sass'
import autoprefixer from 'gulp-autoprefixer'
import cssmin from 'gulp-cssmin'
import fsExtra from 'fs-extra'

const outputDir = path.resolve(__dirname, 'lib')

function compile() {
  return src('./packages/theme-chalk/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(dest('./lib'))
}

function createPackageJson(name) {
  const fileStr = `{
  "name": "${name}",
  "version": "0.0.0",
  "main": "index.css",
  "module": "index.css",
  "style": "index.css"
}`

  fsExtra.outputFile(path.resolve(outputDir, 'package.json'), fileStr, 'utf-8')
}

exports.build = series(compile)

createPackageJson('theme-chalk')
