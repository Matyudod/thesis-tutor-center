const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const {
    ScheduleService,
    DaySessionService,
    DayWeekService,
} = require("../../services/index.service");

class ScheduleApiController {
    async get(req, res) {
        try {
            let daySessionId = req.query.daySessionId;
            let dayWeekId = req.query.dayWeekId;
            let dayWeekService = new DayWeekService();
            let daySessionService = new DaySessionService();
            let dayWeek = await dayWeekService.selectById(dayWeekId);
            let daySession = await daySessionService.selectById(daySessionId);
            let scheduleService = new ScheduleService();
            let schedule = await scheduleService.selectWithSessionAndDayWeek(daySession, dayWeek);
            res.json(schedule);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
}
module.exports = { ScheduleApiController };
