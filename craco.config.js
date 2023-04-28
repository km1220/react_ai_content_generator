const path = require('path')

module.exports = {
	reactScriptsVersion: 'react-scripts',
	webpack: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@layouts': path.resolve(__dirname, 'src/layouts'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@store': path.resolve(__dirname, 'src/store'),

			'@utils': path.resolve(__dirname, 'src/utils'),
		}
	}
}
