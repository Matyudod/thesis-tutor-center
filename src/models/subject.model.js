const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectModelSchema = new Schema(
    {
        subject: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const SubjectModel = mongoose.model("subjects", SubjectModelSchema, "subjects");

module.exports = { SubjectModel };
