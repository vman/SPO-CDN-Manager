const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var Visualizer = require('webpack-visualizer-plugin');

module.exports = Merge(CommonConfig, {
	devtool: "source-map",
	watch: true,
	plugins: [
		new Visualizer({
			filename: './statistics.dev.html'
		})
	]
});