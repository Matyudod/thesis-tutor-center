const express = require("express");
const router = express.Router();

const { SubjectApiController } = require("../controllers/subject.controller");
let subject = new SubjectApiController();
router.route("/").get(subject.get);
router.route("/all").get(subject.getAll);

module.exports = router;
