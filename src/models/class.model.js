const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassModelSchema = new Schema(
    {
        className: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const ClassModel = mongoose.model("classes", ClassModelSchema, "classes");

module.exports = { ClassModel };
