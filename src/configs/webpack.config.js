const path = require("path");
const fs = require("fs");
const pathFolder = path.join(__dirname, "../scss");
let fileNameList = [];
fs.readdirSync(pathFolder).forEach(file => {
    fileNameList.push(path.join(__dirname, "../scss", file));
});
module.exports = {
    entry: fileNameList,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "../src/public/css",
                            name: "[name].min.css",
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
};
