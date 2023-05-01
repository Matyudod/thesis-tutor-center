const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySessionModelSchema = new Schema(
    {
        daySession: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const DaySessionModel = mongoose.model("daysessions", DaySessionModelSchema, "daysessions");

module.exports = { DaySessionModel };
