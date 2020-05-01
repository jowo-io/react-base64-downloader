const pkg = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const libraryName = pkg.name;

/**
 * produces a UMD bundle of our main index.js script, which will be imported using ES6 import syntax.
 */
const indexConfig = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "index.js",
        library: libraryName,
        libraryTarget: "umd",
        publicPath: "/dist/",
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    // Don't bundle react
    resolve: {
        alias: {
            react: __dirname + "./node_modules/react",
        },
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React",
        },
    },
};

/**
 * produces a default bundle for our examples script, which will be includes via the script tag in the browser.
 */
const exampleConfig = {
    entry: "./src/example.js",
    output: {
        filename: "example.js",
        path: __dirname + "/example",
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "React Base64 Download - example",
            filename: "example.html",
        }),
    ],
};

module.exports = [exampleConfig, indexConfig];
