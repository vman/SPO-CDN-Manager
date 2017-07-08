var webpack = require('webpack')
var Visualizer = require('webpack-visualizer-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		vendor: ["react",
				"react-dom",
				"react-redux",
				"redux",
				"redux-logger",
				"redux-thunk",
				"whatwg-fetch", 
				"core-js/fn/object/assign", 
				"core-js/fn/promise",
				"@uifabric/styling",
				"office-ui-fabric-react/lib/Label",
				"office-ui-fabric-react/lib/Button",
				"office-ui-fabric-react/lib/DetailsList",
				"office-ui-fabric-react/lib/MessageBar",
				"office-ui-fabric-react/lib/Pivot",
				"office-ui-fabric-react/lib/Spinner",
				"office-ui-fabric-react/lib/Panel",
				"office-ui-fabric-react/lib/TextField",
				"office-ui-fabric-react/lib/Toggle",
				"office-ui-fabric-react/lib/Fabric"],
		index: ["./Scripts/src/app.tsx"],
		dialog: ["office-ui-fabric-react/lib/Dialog",
		"./Scripts/src/components/DialogContainer.tsx"]
	},
	output: {
		filename: "spo.cdn.manager.[name].js",
		path: __dirname + "/Scripts/dist"
	},
	devtool: false,
	watch: false,
	target: 'web',
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	plugins: [
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
		}),
		new Visualizer({
			filename: './statistics.prod.html'
		}),
		new ExtractTextPlugin({
			filename: 'spo.cdn.manager.css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",

			//filename: "spo.cdn.manager.vendor.js",
			// (Give the chunk a different name)

			minChunks: Infinity,
			// (with more entries, this ensures that no other module
			//  goes into the vendor chunk)
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