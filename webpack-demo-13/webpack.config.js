var path = require('path');
var webpack = require('webpack')

module.exports = {
    cache: true, // better performance for the AggressiveSplittingPlugin
    entry: "./example",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[chunkhash].js",
        chunkFilename: "[chunkhash].js"
    },
    plugins: [
        new webpack.optimize.AggressiveSplittingPlugin({
            minSize: 20000,
            maxSize: 50000
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ],
    recordsOutputPath: path.join(__dirname, "dist", "records.json")
};
