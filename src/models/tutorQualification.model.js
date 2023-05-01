const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TutorQualificationModelSchema = new Schema(
    {
        level: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const TutorQualificationModel = mongoose.model(
    "tutorqualifications",
    TutorQualificationModelSchema,
    "tutorqualifications"
);

module.exports = { TutorQualificationModel };
