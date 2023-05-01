const { CookieProvider } = require("../providers/cookies");
const constants = require("../constants/constants");
module.exports = (req, res, next) => {
    let cookies = new CookieProvider(req, res);
    if (cookies.getCookie(constants.has_message) != "" && cookies.getCookie(constants.has_message) != undefined) {
        let data = JSON.parse(cookies.getCookie(constants.has_message));
        if(data.type == "confirm"){
            req.confirmMesssageResponse = data;
        } else {
            req.messageResponse = data;
        }
        cookies.clearCookie(constants.has_message);
    } else {
        req.messageResponse  = undefined;
        req.confirmMesssageResponse = undefined;
    }
    next();
}