import { plugins } from '../settings/plugins.js'
import { paths } from '../settings/paths.js'

import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'

const config = {
	mode: 'production',
	cache: {
		type: 'filesystem'
	},
	optimization: {
		minimizer: [
			new plugins.TerserPlugin({
				extractComments: false
			})
		]
	},
	output: {
		filename: 'app.min.js',
		path: paths.built,
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'string-replace-loader',
						options: {
							search: '@content',
							replace: '../content',
							flags: 'g'
						}
					}, {
						loader: 'css-loader',
						options: {
							importLoaders: 0,
							sourceMap: false,
							modules: false,
							url: {
								filter: url => {
									!url.includes('content') ||
										!url.includes('fonts')
								}
							}
						}
					}, {
						loader: 'sass-loader',
						options: {
							sassOptions: {
								outputStyle: 'expanded'
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new StylelintWebpackPlugin({
			fix: true
		}),
		new ESLintWebpackPlugin({
			fix: true
		}),
		new plugins.FileIncludeWebpackPlugin({
			source: paths.srcFolder,
			destination: '../',
			htmlBeautifyOptions: {
				'indent-with-tabs': true,
				'indent_size': 4
			},
			replace: [
				{
					regex: '../content',
					to: 'content'
				}, {
					regex: '@content',
					to: 'content'
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: '../css/style.css'
		}),
		new plugins.CopyPlugin({
			patterns: [
				{
					from: `${paths.root}/static`,
					to: '../static',
					noErrorOnMissing: true
				}, {
					from: `${paths.root}/favicon.svg`,
					to: '../',
					noErrorOnMissing: true
				}
			]
		})
	],
	resolve: {
		extensions: [
			'.scss',
			'.js'
		],
		alias: {
			'@scss': `${paths.root}/scss`,
			'@js': `${paths.root}/js`
		}
	}
}

export default config