const express = require("express");
const router = express.Router();

const { UserApiController } = require("../controllers/user.controller");
let user = new UserApiController();
router.route("/user-info").get(user.get);

module.exports = router;
