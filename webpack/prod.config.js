require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var StatsPlugin = require("stats-webpack-plugin");

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
            'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
            './src/client.tsx'
        ]
    },
    output: {
        path: assetsPath,
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel'] },
            { test: /\.tsx?$/, exclude: /node_modules/, loaders: ['ts-loader'] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]') },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules',
            'bower_components'
        ],
        extensions: ['', '.json', '.ts', '.tsx', '.js']
    },
    plugins: [
        new CleanPlugin([assetsPath], { root: projectRootPath }),

        // css files from the extract-text-plugin loader
        new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },

            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        new StatsPlugin(path.join(assetsPath, "stats.json"), {
            chunkModules: true
        }),

        webpackIsomorphicToolsPlugin
    ]
};
