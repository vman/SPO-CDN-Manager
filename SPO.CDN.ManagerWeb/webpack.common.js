var webpack = require('webpack');
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
				"office-ui-fabric-react/lib/TextField",
				"office-ui-fabric-react/lib/Toggle",
				"office-ui-fabric-react/lib/Fabric"],
		index:  ["./Scripts/src/app.tsx"],
		dialog: ["office-ui-fabric-react/lib/Dialog",
				 "./Scripts/src/components/DialogContainer.tsx"],
		panel:  ["office-ui-fabric-react/lib/Panel",
			     "./Scripts/src/components/PanelContainer.tsx"]
	},
	output: {
		filename: "spo.cdn.manager.[name].js",
		path: __dirname + "/Scripts/dist"
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
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