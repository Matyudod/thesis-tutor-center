const {
    AdminService,
    ClassService,
    ClassroomService,
    DayPerWeekService,
    DaySessionService,
    DayWeekService,
    GenderService,
    GradeService,
    PostService,
    ScheduleService,
    SubjectService,
    TeachingFormService,
    TutorService,
    TutorQualificationService,
    TuitionService,
    AuthService,
    UserService,
} = require("../services/index.service");
const customMessage = require("../providers/customMessage");
const constants = require("../constants/constants");
const {CookieProvider} = require("../providers/cookies");
const {JWTCustom} = require("../providers/jwt-custom");
const message = require("../constants/message");
const jwt = new JWTCustom();
class Middleware {
    constructor() {}
    async isAuthenticated(req, res, next) {
        let userService = new UserService();
        let cookies = new CookieProvider(req, res);
        if (cookies.getSignedCookie(constants.access_token) != undefined) {
            let user = jwt.verify(cookies.getSignedCookie(constants.access_token));
            let userData = await userService.selectById(user._id);
            req.user  = userData;
            next();
        } else {
            cookies.setCookie(constants.has_message,JSON.stringify(message.authError),1);
            res.redirect("/");
        }
    }
    
    async isNotAdminAuthenticated(req, res, next) {
        let userService = new UserService();
        let cookies = new CookieProvider(req, res);
        cookies.setSignedCookie(constants.is_desktop_app, "true", 100000);
        if (cookies.getSignedCookie(constants.access_token) == undefined) {
            next();
        } else {
            cookies.setCookie(constants.has_message,JSON.stringify(message.authenticated),1);
            res.redirect("/admin");
        }
    }

    async getOnlyUser(req, res, next) {
        let userData = undefined;
        let userService = new UserService();
        let cookies = new CookieProvider(req, res);
        if (cookies.getSignedCookie(constants.access_token) != undefined) {
            let user = jwt.verify(cookies.getSignedCookie(constants.access_token));
            userData = await userService.selectById(user._id);
        }
        req.user  = userData;
        next();
    }
    
    async isNotAuthenticate(req, res, next) {
        let userService = new UserService();
        let cookies = new CookieProvider(req, res);
        if (cookies.getSignedCookie(constants.access_token) == undefined) {
            next();
        } else {
            cookies.setCookie(constants.has_message,JSON.stringify(message.authenticated),1);
            res.redirect("/");
        }
    }
    
    async isNotTutor(req, res, next) {
        let userService = new UserService();
        let tutorService = new TutorService();
        let cookies = new CookieProvider(req, res);
        if (cookies.getSignedCookie(constants.access_token) != undefined) {
            let user = jwt.verify(cookies.getSignedCookie(constants.access_token));
            let userData = await userService.selectById(user._id);
            let tutor = await tutorService.selectOne({
                tutor: userData,
            });
            if (tutor != null) {
                cookies.setCookie(constants.has_message,JSON.stringify(message.authErrorPermissionTutor),1);
                return res.redirect("/");
            }
            req.user  = userData;
            next();
        } else {
            cookies.setCookie(constants.has_message,JSON.stringify(message.authError),1);
            res.redirect("/");
        }
    }

    async isAdmin(req, res, next) {
        let userService = new UserService();
        let cookies = new CookieProvider(req, res);
        if (cookies.getSignedCookie(constants.access_token) != undefined) {
            let user = jwt.verify(cookies.getSignedCookie(constants.access_token));
            if (user.isAdmin) {
                let userData = await userService.selectById(user._id);
                req.user = userData;
                return next();
            }
        }
        cookies.setCookie(constants.has_message,JSON.stringify(message.authErrorPermission),1);
        return res.redirect("/");
    }
};

module.exports = { Middleware };
