var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: ["whatwg-fetch",
	 "core-js/fn/object/assign",
	 "core-js/fn/promise",
	  "./Scripts/src/app.tsx"],
	output: {
		filename: "spo.cdn.manager.bundle.js",
		path: __dirname + "/Scripts/dist"
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",
	watch: true,
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'spo.cdn.manager.css',
			allChunks: true
		})
	],
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				options: {
					configFileName: 'tsconfig.json'
				}
			},
			{
 				test: /\.tsx?$/,
 				enforce: 'pre',
 				loader: 'tslint-loader',
 				options: {
					configFileName: 'tslint.json'
 				}
 			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			}
		]
	}
};