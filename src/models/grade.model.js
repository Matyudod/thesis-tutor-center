const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GradeModelSchema = new Schema(
    {
        grade: { type: String, trim: true, required: true },
        classes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                autopopulate: true,
                ref: "classes",
                required: true,
            },
        ],
    },
    { versionKey: false }
);

GradeModelSchema.plugin(require("mongoose-autopopulate"));
const GradeModel = mongoose.model("grades", GradeModelSchema, "grades");

module.exports = { GradeModel };
