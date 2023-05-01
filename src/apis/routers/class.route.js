const express = require("express");
const router = express.Router();

const { ClassApiController } = require("../controllers/class.controller");
let classA = new ClassApiController();
router.route("/").get(classA.get);

module.exports = router;
