var webpack = require('webpack')

module.exports = {
	entry: ["whatwg-fetch","./Scripts/src/app.tsx"],
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
		new webpack.ProvidePlugin({
			'Promise': 'es6-promise'
		})
	],
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
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
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			}
		]
	}
};