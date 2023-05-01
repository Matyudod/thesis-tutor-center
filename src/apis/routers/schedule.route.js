const express = require("express");
const router = express.Router();

const { ScheduleApiController } = require("../controllers/schedule.controller");
let schedule = new ScheduleApiController();
router.route("/").get(schedule.get);

module.exports = router;
