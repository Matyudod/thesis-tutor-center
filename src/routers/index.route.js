const { HomeController } = require("../controllers/home.controller");
const { FakeDataVietnamese } = require("../providers/fake-data");
const getMessage = require("../middlewares/message.middleware");
const {
    TeachingFormService,
    ScheduleService,
    SubjectService,
    ClassService,
    ClassroomService,
    DayPerWeekService,
    DaySessionService,
    DayWeekService,
    UserService,
    GenderService,
} = require("../services/index.service");

const apiRouter = require("../apis/routers/index.route");
const authsRouter = require("./auth.route");
const homesRouter = require("./home.route");
const adminRouter = require("./admin.route");
const formsRouter = require("./form.route");
const usersRouter = require("./user.route");

const { CookieProvider } = require("../providers/cookies");
const { JWTCustom } = require("../providers/jwt-custom");
const { Middleware } = require("../middlewares/isAuthenticated.middleware");
const middlewares  = new Middleware();
let jwt = new JWTCustom();
let cookies = new CookieProvider();
let homes = new HomeController();
const ApiError = require("../providers/api-error");

const express = require("express");
const router = express.Router();
//handle api route
router.use("/api", apiRouter);
//handle mvc route
router.use("/auth",getMessage, authsRouter);
router.use("/admin",getMessage, middlewares.isAuthenticated, middlewares.isAdmin, adminRouter);
router.use("/form",getMessage, formsRouter);
router.use("/user",getMessage, middlewares.isAuthenticated, usersRouter);

router.use("/",getMessage, homesRouter);

// handle error when call route be not found
router.use(homes.pageNotFound);

router.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = router;
