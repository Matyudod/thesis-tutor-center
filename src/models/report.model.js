const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportModelSchema = new Schema(
    {
        course : {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "classrooms",
            required: true,
        },
        date: { type: Date, default: Date.now, required: true },
        score: { type: Number, default: null, required: true },
        reason: { type: String, trim: true },
    },
    { versionKey: false }
);


ReportModelSchema.plugin(require("mongoose-autopopulate"));
const ReportModel = mongoose.model("reports", ReportModelSchema, "reports");

module.exports = { ReportModel };
