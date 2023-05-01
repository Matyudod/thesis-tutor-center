const { JWTCustom } = require("../providers/jwt-custom");
let jwt = new JWTCustom();
const constants = require("../constants/constants");
const { CookieProvider } = require("../providers/cookies");
const { AuthService } = require("../services/auth.service");
const MongoDB = require("../providers/database");
const customMessage = require("../providers/customMessage");
const message = require("../constants/message");
const scheme = require("../constants/validation");
const extractUserData = require("../models/user.model");
const Validator = require("fastest-validator");

class AuthController {
    login(req, res) {
        res.render("index", { page: "login" });
    }

    async loginHandler(req, res) {
        const authService = new AuthService(MongoDB.connection);
        let cookies = new CookieProvider(req, res);
        cookies.clearCookie(constants.has_message);
        let user = {
            username: req.body.username,
            password: req.body.password,
        };
        try {
            const v = new Validator();
            let validationResponse = v.validate(user, scheme.login);
            if (validationResponse !== true) {
                return res.render("index", {
                    page: "login",
                    dialogMessage: message.errorFieldIsNull,
                });
            } else {
                let result = await authService.login(user);
                if (result != null) {
                    let userInfo = {
                        _id: result._id,
                        name: result.name,
                        username: result.username,
                        email: result.email,
                        isAdmin: result.isAdmin,
                    };
                    cookies.setSignedCookie(constants.access_token, jwt.generate(userInfo), 600);
                    cookies.setCookie(
                        constants.has_message,
                        JSON.stringify(customMessage("Đăng nhập", message.successComplete)),
                        1
                    );
                    if (result.isAdmin) {
                        return res.redirect("/admin");
                    } else {
                        return res.redirect("/");
                    }
                } else {
                    return res.render("index", {
                        page: "login",
                        dialogMessage: customMessage("người dùng này", message.errorNotFound),
                    });
                }
            }
        } catch (err) {
            return res.render("index", { page: "login", dialogMessage: message.APIErrorServer });
        }
    }
    
    loginAdmin(req, res) {
        res.render("index", { page: "login-admin" });
    }

    async loginAdminHandler(req, res) {
        const authService = new AuthService(MongoDB.connection);
        let cookies = new CookieProvider(req, res);
        cookies.clearCookie(constants.has_message);
        let user = {
            username: req.body.username,
            password: req.body.password,
        };
        try {
            const v = new Validator();
            let validationResponse = v.validate(user, scheme.login);
            if (validationResponse !== true) {
                return res.render("index", {
                    page: "login",
                    dialogMessage: message.errorFieldIsNull,
                });
            } else {
                let result = await authService.login(user);
                if (result != null) {
                    let userInfo = {
                        _id: result._id,
                        name: result.name,
                        username: result.username,
                        email: result.email,
                        isAdmin: result.isAdmin,
                    };
                    if (result.isAdmin) {
                        cookies.setSignedCookie(constants.access_token, jwt.generate(userInfo), 600);
                        cookies.setCookie(
                            constants.has_message,
                            JSON.stringify(customMessage("Đăng nhập", message.successComplete)),
                            1
                        );
                        return res.redirect("/admin");
                    } else {
                        return res.render("index", {
                            page: "login",
                            error_message:"Đây không phải tài khoản quản trị viên. Vui lòng kiểm tra lại!"
                        });
                    }
                } else {
                    return res.render("index", {
                        page: "login",
                        error_message:"Sai tên đăng nhập hoặc password. Vui lòng kiểm tra lại!"
                    });
                }
            }
        } catch (err) {
            return res.render("index", { page: "login", dialogMessage: message.APIErrorServer });
        }
    }

    signUp(req, res) {
        res.render("index", { page: "signUp" });
    }
    async signUpHandler(req, res) {
        let cookies = new CookieProvider(req, res);
        const authService = new AuthService();
        let user = req.body;
        try {
            const v = new Validator();
            let validationResponse = v.validate(user, scheme.signUp);
            if (validationResponse !== true) {
                return res.render("index", {
                    page: "signUp",
                    dialogMessage: message.errorFieldIsNull,
                });
            } else {
                let userCheck = await authService.checkUser(user.username);
                if(userCheck == null){
                    let result = await authService.signUp(user);
                    if (result != null) {
                        cookies.setCookie(
                            constants.has_message,
                            JSON.stringify(customMessage("Đăng ký", message.successComplete)),
                            1
                        );
                        return res.redirect("/");
                    } else {
                        return res.render("index", {
                            page: "signUp",
                            dialogMessage: customMessage("Đăng ký", message.failure),
                        });
                    }
                } else {
                    return res.render("index", {
                        page: "signUp",
                        dialogMessage: customMessage("Tên người dùng", message.errorFieldIsExisted),
                    });
                }
            }
        } catch (err) {
            cookies.setCookie("error", message.APIErrorServer);
            return res.render("index", { page: "signUp", dialogMessage: message.APIErrorServer });
        }
    }
    logout(req, res) {
        let cookies = new CookieProvider();
        cookies.setParamater(req, res);
        cookies.clearCookie(constants.access_token);
        cookies.clearCookie(constants.has_message);
        cookies.clearCookie(constants.backToPrevious);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Đăng xuất", message.successComplete)),
            1
        );
        res.redirect("/");
    }
}
module.exports = { AuthController };
