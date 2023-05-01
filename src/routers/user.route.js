const express = require("express");
const { UserController } = require("../controllers/user.controller");
const { Middleware } = require("../middlewares/isAuthenticated.middleware");
const middlewares  = new Middleware();
const multer = require("multer");
const upload = multer();
const router = express.Router();
let users = new UserController();
router.route("/my-class").get(users.userCourse);
router.route("/my-class-received")
    .get(users.courseOfTutor)
    .post(
        middlewares.isAuthenticated,
        upload.single("formFile"),
        users.updateDocument
    );
router.route("/course-update/:courseId").get(users.updateCourse)
router.route("/change-password").post(users.changePassword);
router.route("/update-tutor-infomation").get(users.updateTutor).post(
    middlewares.isAuthenticated,
    upload.fields([
        {
            name: "CV",
            maxCount: 1,
        },
        {
            name: "image",
            maxCount: 1,
        },
        {
            name: "identityImages",
            maxCount: 2,
        },
        {
            name: "degrees",
            maxCount: 4,
        },
    ]),
    users.updateTutorHandler
);
router.route("/update-information")
    .post(users.updateInfo)
    
module.exports = router;
