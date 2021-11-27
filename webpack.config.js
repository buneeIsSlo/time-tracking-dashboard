const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
    let devType = env.production || false;
    console.log(devType);

    return {
        mode: devType ? "production" : "development",

        entry: "./src/js/app.js",

        output: {
            filename: "js/app.bundle.js",
            path: path.resolve(__dirname, "docs"),
            assetModuleFilename: "imgs/[name][ext]",
            clean: true
        },

        devServer: {
            static: {
                directory: path.resolve(__dirname, "./docs")
            },
            port: 5001
        },

        module: {
            rules: [{
                    test: /\.html/g,
                    use: ["html-loader"]
                },

                {
                    test: /\.(svg|ico|webp|png|jpg|jpeg|gif)$/,
                    type: "asset/resource"
                },

                {
                    test: /\.css/g,
                    use: [
                        devType ? MiniCssExtractPlugin.loader : "style-loader",
                        {
                            loader: "css-loader"
                        }
                    ]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(__dirname, "./src/index.html")
            }),
            new MiniCssExtractPlugin({
                filename: "css/main.css"
            })
        ]

    };
};