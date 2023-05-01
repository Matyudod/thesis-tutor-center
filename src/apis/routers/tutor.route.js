const express = require("express");
const router = express.Router();

const { TutorApiController } = require("../controllers/tutor.controller");
let tutor = new TutorApiController();
router.route("/get-chosen-list").post(tutor.getWithArrayId);
router.route("/get-avartar-list").post(tutor.getListAvartar);
router.route("/search").post(tutor.getSearchTutor); 
router.route("/search-price").post(tutor.getSearchPriceOfTutor); 

module.exports = router;
