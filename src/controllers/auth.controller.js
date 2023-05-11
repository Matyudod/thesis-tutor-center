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
var nodemailer = require('nodemailer');
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
                    page: "login-admin",
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
                        cookies.setSignedCookie(constants.is_desktop_app, "true", 100000);
                        cookies.setCookie(
                            constants.has_message,
                            JSON.stringify(customMessage("Đăng nhập", message.successComplete)),
                            1
                        );
                        return res.redirect("/admin");
                    } else {
                        return res.render("index", {
                            page: "login",
                            error_message: "Đây không phải tài khoản quản trị viên. Vui lòng kiểm tra lại!"
                        });
                    }
                } else {
                    return res.render("index", {
                        page: "login-admin",
                        error_message: "Sai tên đăng nhập hoặc password. Vui lòng kiểm tra lại!"
                    });
                }
            }
        } catch (err) {
            return res.render("index", { page: "login-admin", dialogMessage: message.APIErrorServer });
        }
    }

    signUp(req, res) {
        res.render("index", { page: "signUp" });
    }

    async sendEmailForSignUp(req, res) {
        let cookies = new CookieProvider(req, res);
        if (
            req.body.username != undefined &&
            req.body.password != undefined &&
            req.body.name != undefined &&
            req.body.email != undefined
        ) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hn65412@gmail.com',
                    pass: 'iaraonbxpusulcse'
                }
            });
            let template = "";
            template += '<!DOCTYPE html>';
            template += '<html>';
            template += '<head>';
            template += '<title>Tạo tài khoản thành công</title>';
            template += '<meta charset="utf-8">';
            template += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
            template += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />';
            template += '<style>';
            template += 'body {';
            template += 'font-family: Arial, sans-serif;';
            template += 'margin: 0;';
            template += 'padding: 0;';
            template += 'background-color: #f5f5f5;';
            template += '}';
            template += '.container {';
            template += 'padding: 20px;';
            template += 'background-color: #ffffff;';
            template += '}';
            template += 'h1 {';
            template += 'color: #333333;';
            template += 'font-size: 24px;';
            template += 'margin-top: 0;';
            template += '}';
            template += 'p {';
            template += 'color: #666666;';
            template += 'font-size: 16px;';
            template += 'line-height: 1.5;';
            template += 'margin-bottom: 10px;';
            template += '}';
            template += '.button {';
            template += 'display: inline-block;';
            template += 'padding: 10px 20px;';
            template += 'background-color: #0066cc;';
            template += 'color: #ffffff;';
            template += 'font-size: 16px;';
            template += 'text-decoration: none;';
            template += 'border-radius: 5px;';
            template += 'transition: all 0.2s ease;';
            template += '}';
            template += '.button:hover {';
            template += 'background-color: #004c99;';
            template += '}';
            template += 'ul.contact-list {';
            template += 'color: #666666;';
            template += 'list-style: none;';
            template += 'margin: 0;';
            template += 'padding: 0;';
            template += '}';
            template += 'ul.contact-list li i {';
            template += 'margin-right: 10px;';
            template += '}';
            template += 'ul.contact-list li span {';
            template += 'margin-left: 22px;';
            template += '}';
            template += 'ul.contact-list li {';
            template += 'font-size: 16px;';
            template += 'line-height: 1.5;';
            template += 'margin-bottom: 10px;';
            template += '}';
            template += 'div {';
            template += 'color: #666666;';
            template += '}';
            template += '</style>';
            template += '</head>';
            template += '<body>';
            template += '<div class="container">';
            template += '<h1>Tạo tài khoản thành công</h1>';
            template += '<p>Chào Anh/Chị,</p>';
            template += '<p>Chúng tôi xin thông báo rằng tài khoản của Anh/Chị đã được tạo thành công trên Trung tâm gia sư Duy Tâm.</p>';
            template += '<p>Với tài khoản này, Anh/Chị có thể truy cập và tìm kiếm các khóa học và gia sư phù hợp với nhu cầu của mình.';
            template += 'Để sử dụng tài khoản, Anh/Chị cần xác nhận thông tin tài khoản của mình bằng cách nhấn vào nút xác nhận dưới';
            template += 'đây.</p>';
            template += '<form method="post" action="{{url}}/auth/verify-email-sign-up">';
            template += '<input type="hidden" name="username" value="{{username}}" hidden>';
            template += '<input type="hidden" name="password" value="{{password}}" hidden>';
            template += '<input type="hidden" name="name" value="{{name}}" hidden>';
            template += '<input type="hidden" name="email" value="{{email}}" hidden>';
            template += '<button type="submit" class="button">Xác nhận</button>';
            template += '</form>';
            template += '<footer>';
            template += '<div style="margin-top: 10px;">';
            template += 'Trân trọng';
            template += '</div>';
            template += '<h3><div>Trung tâm gia sư Duy Tâm</div></h3>';
            template += '<div style="margin-top: 10px;">';
            template += '<ul class="contact-list">';
            template += '<li><i class="fa fa-map-marker"></i>Văn phòng Trung Tâm Gia Sư Sóc Trăng,<br>';
            template += '<span>Địa chỉ: 375/2, Phạm Hùng, Khóm 3, Phường 8, Tp. Sóc Trăng</span> </li>';
            template += '<li><i class="fa fa-map-marker"></i>Văn phòng Trung Tâm Gia Sư HCM,<br>';
            template += '<span>Địa chỉ: 672A28, Đường Phan Văn Trị, Phường 10, Quận Gò Vấp (Khu CityLand Park Hill)</span> </li>';
            template += '<li><i class="fa fa-phone"></i>(0399) 3819-666</li>';
            template += '<li><i class="fa fa-envelope"></i>support@tdtutorcenter.com</li>';
            template += '</ul>';
            template += '</div>';
            template += '</footer>';
            template += '</div>';
            template += '</body>';
            template += '</html>';
            template = template.replace('{{url}}', "http://localhost:3000");
            template = template.replace('{{username}}', req.body.username);
            template = template.replace('{{password}}', req.body.password);
            template = template.replace('{{name}}', req.body.name);
            template = template.replace('{{email}}', req.body.email);
            var mailOptions = {
                from: 'Trung Tâm Gia Sư Duy Tâm',
                to: req.body.email,
                subject: 'Xác thực email',
                html: template
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    cookies.setCookie(
                        constants.has_message,
                        JSON.stringify(customMessage("Gửi email thất bại vui lòng thử lại!", message.errorCustom)),
                        1
                    );
                    res.redirect('/auth/sign-up')
                } else {
                    cookies.setCookie(
                        constants.has_message,
                        JSON.stringify(customMessage("Email đăng ký đã được gửi vào hộp mail của bạn vui lòng kiểm tra!", message.successCustom)),
                        1
                    );
                    res.redirect('/auth/login')
                }
            });
        } else {
            cookies.setCookie(
                constants.has_message,
                JSON.stringify(customMessage("Vui lòng điền đầy đủ thông tin và thử lại!", message.errorCustom)),
                1
            );
            res.redirect('/auth/sign-up')
        }
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
                if (userCheck == null) {
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
        if (cookies.getSignedCookie(constants.is_desktop_app) != undefined) {
            res.redirect("/auth/loginAdmin")
        } else {
            res.redirect("/");
        }
    }
}
module.exports = { AuthController };
