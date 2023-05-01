const fs = require("fs");
const path = require("path");
module.exports = (dir, filename, data, mimetype) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    let extendFile = mimetype.split("/")[1];
    let index = fs.readdirSync(dir).length;
    let fileName = filename + "_" + index + "." + extendFile;
    fs.writeFileSync(path.join(dir, fileName), data);
    return fileName;
};
