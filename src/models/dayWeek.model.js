const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DayWeekModelSchema = new Schema(
    {
        dayWeek: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const DayWeekModel = mongoose.model("dayweeks", DayWeekModelSchema, "dayweeks");

module.exports = { DayWeekModel };
