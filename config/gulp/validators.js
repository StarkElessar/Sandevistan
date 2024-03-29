import { app } from '../../gulpfile.js'

import { htmlValidator } from 'gulp-w3c-html-validator'
import accessibility from 'gulp-wcag-accessibility'
import bemValidator from 'gulp-html-bem-validator'
// add css validator

const validator = () => {
	return app.gulp.src
		(
			[
				`${app.paths.build.html}*.html`
				// `!${app.paths.build.html}*.min.html`
			]
		)
		.pipe(bemValidator())
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter())
		.pipe(accessibility({
			accessibilityLevel: 'WCAG2AAA',
			reportLevels: {
				warning: true,
				error: true
			},
			verbose: false,
			force: true
		}))
}

export { validator }