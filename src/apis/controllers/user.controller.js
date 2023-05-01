const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const constants = require("../../constants/constants");
const { TutorService, UserService } = require("../../services/index.service");

const { JWTCustom } = require("../../providers/jwt-custom");
let jwt = new JWTCustom();
const { CookieProvider } = require("../../providers/cookies");
let cookies = new CookieProvider();
class UserApiController {
    async get(req, res) {
        cookies.setParamater(req, res);
        if (cookies.getSignedCookie(constants.access_token)) {
            let user = jwt.verify(cookies.getSignedCookie(constants.access_token));
            if (user.isAdmin) {
                user.isTutor = false;
                user.isApproving = false;
            } else {
                let tutorService = new TutorService();
                let userService = new UserService();
                let data = await userService.selectById(user._id);
                let tutor = await tutorService.selectOne({
                    tutor: data,
                });
                if (tutor != null) {
                    if (tutor.isApproved) {
                        user.isTutor = true;
                        user.isApproving = false;
                        user.tutor = tutor;
                    } else {
                        user.isTutor = false;
                        user.isApproving = true;
                    }
                } else {
                    user.isTutor = false;
                    user.isApproving = false;
                }
            }
            res.json(user);
        } else {
            res.json(null);
        }
    }
}
module.exports = { UserApiController };
