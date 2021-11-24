const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",

    entry: "./src/js/app.js",

    output: {
      filename: "js/app.bundle.js",
      path: path.resolve(__dirname, "docs"),
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, "./docs")
        },
        port: 5001
    },

    module: {
        rules: [
            {
                test: /\.html/g,
                use: ["html-loader"]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "./src/index.html")
        })
    ]
}