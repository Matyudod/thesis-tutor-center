const express = require("express");
const { HomeController } = require("../controllers/home.controller");
const { Middleware } = require("../middlewares/isAuthenticated.middleware");
const middlewares  = new Middleware();
const multer = require("multer");
const upload = multer();
const router = express.Router();
let homes = new HomeController();
router.route("/home").get(homes.index);
router.route("/home-page").get(homes.index);
router.route("/class-detail/:id").get(middlewares.getOnlyUser,homes.classDetail);
router.route("/course-documents/:courseId").get(homes.viewDocument);
router.route("/apply-for-course").post(middlewares.isAuthenticated,homes.getThisCourse);
router.route("/tutor-detail/:id").get(homes.tutorDetail);
router.route("/my-report").get(middlewares.isAuthenticated,homes.myReport).post(middlewares.isAuthenticated,homes.submitReportHandler);
router.route("/post/:id").get(homes.postDetail);
router.route("/subject/:id").get(homes.tutorWithSubjectIdDetail).post(homes.tutorWithSubjectIdDetail);
router.route("/choose-tutor").get(homes.chooseTutor).post(homes.chooseTutor);
router.route("/tuition-fee-reference").get(homes.tuitionFeeReference);
router.route("/service-reference").get(homes.serviceReference);
router.route("/careful").get(homes.careful);
router.route("/needs-tutor").get(homes.needsTutor);
router.route("/contract-form").get(homes.contractForm);
router
    .route("/test")
    .get(homes.test)
    .post(
        upload.fields([
            {
                name: "test_files",
                maxCount: 2,
            },
            {
                name: "test_files_1",
                maxCount: 3,
            },
        ]),
        homes.test1
    );
router.route("/").get(homes.index);

module.exports = router;
