const express = require("express");
const router = express.Router();

const { ReportApiController } = require("../controllers/report.controller");
let report = new ReportApiController();
router.route("/rate").post(report.rate);

module.exports = router;
