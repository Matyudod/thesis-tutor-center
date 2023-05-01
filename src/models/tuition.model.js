const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TuitionModelSchema = new Schema(
    {
        dayPerWeek: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "dayperweeks",
            required: true,
        },
        grade: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "grades",
            required: true,
        },
        teachingForm: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "teachingforms",
            required: true,
        },
        tutorQualifications: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    autopopulate: true,
                    ref: "tutorqualifications",
                },
            ],
            required: true,
        },
        tuitionMin: { type: Number, required: true, min: 750000, max: 10000000 },
        tuitionMax: { type: Number, required: true, min: 900000, max: 12000000 },
        insertedAt: { type: Date, default: Date.now },
        expiredAt: { type: Date, default: null },
    },
    { versionKey: false }
);

TuitionModelSchema.plugin(require("mongoose-autopopulate"));
const TuitionModel = mongoose.model("tuitions", TuitionModelSchema, "tuitions");

module.exports = { TuitionModel };
