const express = require("express");
const router = express.Router();

const { ClassroomApiController } = require("../controllers/classroom.controller");
let classroom = new ClassroomApiController();
router.route("/search").post(classroom.search);

module.exports = router;
