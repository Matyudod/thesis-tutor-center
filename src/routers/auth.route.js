const express = require("express");
const { AuthController } = require("../controllers/auth.controller");
const { Middleware } = require("../middlewares/isAuthenticated.middleware");
const middlewares  = new Middleware();
const router = express.Router();
let auths = new AuthController();
router.route("/login")
.get(middlewares.isNotAuthenticate, auths.login)
.post(middlewares.isNotAuthenticate, auths.loginHandler);
router.route("/loginAdmin")
.get(middlewares.isNotAdminAuthenticated, auths.loginAdmin)
.post(middlewares.isNotAdminAuthenticated, auths.loginAdminHandler);
router.route("/sign-up")
.get(middlewares.isNotAuthenticate, auths.signUp)
.post(middlewares.isNotAuthenticate, auths.sendEmailForSignUp);
router.route("/verify-email-sign-up").post(middlewares.isNotAuthenticate,auths.signUpHandler);
router.route("/logout").get(middlewares.isAuthenticated, auths.logout);
module.exports = router;
