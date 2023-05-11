const express = require("express");
const { FormController } = require("../controllers/form.controller");
const { Middleware } = require("../middlewares/isAuthenticated.middleware");
const middleware = new Middleware();
const multer = require("multer");
const upload = multer();
const router = express.Router();
let forms = new FormController();
router
    .get("/course-register", forms.courseRegister)
    .post("/course-register",middleware.isAuthenticated, forms.courseRegisterHandler);
router
    .route("/register-tutor")
    .get(forms.registerTutor)
    .post(
        middleware.isNotTutor,
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
        forms.registerTutorHandler
    );

module.exports = router;
