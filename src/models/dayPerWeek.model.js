const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DayPerWeekModelSchema = new Schema(
    {
        dayPerWeek: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const DayPerWeekModel = mongoose.model("dayperweeks", DayPerWeekModelSchema, "dayperweeks");

module.exports = { DayPerWeekModel };
