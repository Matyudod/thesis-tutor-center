const mongoose = require("mongoose");
class MongoDB {
    static async connect(uri) {
        mongoose.set("strictQuery", false);
        await mongoose.connect(uri);
    }
}
module.exports = MongoDB;
