var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '..', 'dist', 'client', 'static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.IgnorePlugin(/locale/, /moment$/),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('stage'),
            'process.env.npm_package_version': JSON.stringify(require('../package.json').version)
        })
    ],
    resolve: {
        alias: {}
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, '..', 'src')
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.png$/, loader: 'url-loader?limit=100000' },
            { test: /\.jpg$/, loader: 'file-loader' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.otf/, loader: "url-loader?limit=100000"},
            { test: /\.woff/, loader: "url-loader?limit=100000"},
            { test: /\.woff2/, loader: "url-loader?limit=100000"},
            { test: /\.otf/, loader: "url-loader"},
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
        ]
    }
};
