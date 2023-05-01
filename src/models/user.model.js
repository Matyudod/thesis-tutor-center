const mongoose = require("mongoose");
const bcrypt = new require("bcrypt");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserModelSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        username: { type: String, trim: true, required: true },
        password: { type: String, trim: true, required: true },
        email: { type: String, trim: true, required: true },
        isAdmin: { type: Boolean, default: false },
    },
    { versionKey: false }
);


const UserModel = mongoose.model("users", UserModelSchema, "users");

module.exports = { UserModel };
