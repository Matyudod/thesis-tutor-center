const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ScheduleModelSchema = new Schema(
    {
        dayWeek: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "dayweeks",
            required: true,
        },
        daySession: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "daysessions",
            required: true,
        },
        schedule: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

ScheduleModelSchema.plugin(require("mongoose-autopopulate"));
const ScheduleModel = mongoose.model("schedules", ScheduleModelSchema, "schedules");

module.exports = { ScheduleModel };
