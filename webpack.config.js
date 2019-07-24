const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * produces a UMD bundle of our main index.js script, which will be imported using ES6 import syntax.
 */
const indexConfig = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};

/**
 * produces a default bundle for our examples script, which will be includes via the script tag in the browser.
 */
const exampleConfig = {
    entry: './src/example.js',
    output: {
        filename: 'example.js',
        path: __dirname + '/dist/example',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'React Base64 Download - example',
            filename: 'example.html',
        }),
    ],
};

module.exports = [exampleConfig, indexConfig];
