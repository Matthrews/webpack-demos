var path = require('path');

module.exports = {
    // mode: "development || "production",
    entry: {
        bundle: "./example",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    optimization: {
        chunkIds: "deterministic" // To keep filename consistent between different modes (for example building only)
    }
};
