require("dotenv").config();
const config = {
    uri: process.env.MONGODB_SERVER || "mongodb://127.0.0.1:27017/thesis",
    port: process.env.PORT || "3000",
};
module.exports = config;
