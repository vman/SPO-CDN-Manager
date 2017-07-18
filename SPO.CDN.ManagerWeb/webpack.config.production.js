var webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var Visualizer = require('webpack-visualizer-plugin');

module.exports = Merge(CommonConfig, {
    devtool: "source-map",
    watch: true,
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
        })
    ]
});