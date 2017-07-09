const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var Visualizer = require('webpack-visualizer-plugin');

module.exports = Merge(CommonConfig, {
	devtool: "source-map",
	watch: true,
	entry: {
		vendor:[
			"redux-logger"
		]
	},
	plugins: [
		new Visualizer({
			filename: './statistics.dev.html'
		})
	],
	module:{
		rules:[
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	}
});