var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		vendor: ["react",
				"react-dom",
				"react-redux",
				"redux",
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
				"office-ui-fabric-react/lib/TextField",
				"office-ui-fabric-react/lib/Fabric",
				"office-ui-fabric-react/lib/Dialog",
				"office-ui-fabric-react/lib/Panel",
				"office-ui-fabric-react/lib/Toggle"
				],
		app:  ["./Scripts/src/app.tsx"]
	},
	output: {
		filename: "spo.cdn.manager.[name].js",
		path: __dirname + "/Scripts/dist"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'spo.cdn.manager.css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: Infinity
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