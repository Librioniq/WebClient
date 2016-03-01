'use strict';

var path = require('path');

module.exports = {
    entry: { 
        app: path.resolve(__dirname, 'client/main'), 
        styles: path.resolve(__dirname, 'client/scss/main.scss') 
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', 'scss', 'sass']
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            { test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png$/, loader: 'file' },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass' },
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    modulesDirectories: ["web_modules", "node_modules", "bower_components"]
};