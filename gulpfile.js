import gulp from 'gulp'

import { argv } from 'node:process'

import { plugins } from './config/settings/plugins.js'
import { paths } from './config/settings/paths.js'

import { otfToTtf, ttfToWoff, fontsStyle } from './config/gulp/fonts.js'
import { validator } from './config/gulp/validators.js'
import { gitIgnore } from './config/gulp/gitIgnore.js'
import { images } from './config/gulp/images.js'
import { sprite } from './config/gulp/sprite.js'
import { jsDev } from './config/gulp/jsDev.js'
import { reset } from './config/gulp/reset.js'
import { html } from './config/gulp/html.js'
import { css } from './config/gulp/css.js'
import { zip } from './config/gulp/zip.js'
import { ftp } from './config/gulp/ftp.js'
import { js } from './config/gulp/js.js'

const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fontsStyle)
const build = gulp.series(
	fonts,
	jsDev,
	js,
	gulp.parallel(html, css, images),
	gulp.parallel(validator, zip)
)
const dev = gulp.parallel(fonts, sprite, gitIgnore)
const runFTP = gulp.series(build, ftp)

const app = {
	isNoWebp: !argv.includes('--nowebp'),
	plugins,
	paths,
	gulp
}

gulp.task('default', dev)

export { sprite, runFTP, build, fonts, app }
