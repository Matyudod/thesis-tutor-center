const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeachingFormModelSchema = new Schema(
    {
        teachingForm: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const TeachingFormModel = mongoose.model("teachingforms", TeachingFormModelSchema, "teachingforms");

module.exports = { TeachingFormModel };
