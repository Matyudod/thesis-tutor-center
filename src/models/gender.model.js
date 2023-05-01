const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenderModelSchema = new Schema(
    {
        gender: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const GenderModel = mongoose.model("genders", GenderModelSchema, "genders");

module.exports = { GenderModel };
