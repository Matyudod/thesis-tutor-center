const express = require("express");
const router = express.Router();
const scheduleRouter = require("./schedule.route");
const userRouter = require("./user.route");
const tutorRouter = require("./tutor.route");
const postRouter = require("./post.route");
const classRouter = require("./class.route");
const classroomRouter = require("./classroom.route");
const subjectRouter = require("./subject.route");
const reportRouter = require("./report.route");

const { ImportCSSApiController } = require("../controllers/importCss.controller");
router.use("/user", userRouter);
router.use("/tutor", tutorRouter);
router.use("/post", postRouter);
router.use("/class", classRouter);
router.use("/classroom", classroomRouter);
router.use("/subject", subjectRouter);
router.use("/schedule", scheduleRouter);
router.use("/rate", reportRouter);
router.get("/inmport-css", new ImportCSSApiController().get);

module.exports = router;
