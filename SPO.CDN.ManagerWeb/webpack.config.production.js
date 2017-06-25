var webpack = require('webpack')

module.exports = {
	entry: "./Scripts/src/app.tsx",
	output: {
		filename: "spo.cdn.manager.bundle.min.js",
		path: __dirname + "/Scripts/dist"
	},
	watch: false,
	target: 'web',
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	plugins: [
		new webpack.ProvidePlugin({
			'Promise': 'es6-promise'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"' // Reduces 78 kb in React
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
				drop_console: true,
				drop_debugger: true
			},
			debug: false,
			sourceMap: false,
			output: {
				comments: false
			}
		})
	],
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
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