var HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        example: './src/example.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
    devtool: '',
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
            chunks: ['example'],
            title: 'React Base64 Download - examples',
            filename: 'example.html',
        }),
    ],
}
