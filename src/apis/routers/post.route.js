const express = require("express");
const router = express.Router();

const { PostApiController } = require("../controllers/post.controller");
let post = new PostApiController();
router.route("/").get(post.get);

module.exports = router;
