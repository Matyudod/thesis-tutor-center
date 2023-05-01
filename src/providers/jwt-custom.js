const jwt = require("jsonwebtoken");
require("dotenv").config();
class JWTCustom {
    generate(user) {
        return jwt.sign(user, process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : "secretKey", {
            expiresIn: process.env.TOKEN_EXPIRE * 60 * 24,
        });
    }
    verify(token) {
        let dataToken = jwt.verify(
            token,
            process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : "secretKey"
        );
        delete dataToken.iat;
        delete dataToken.exp;

        return dataToken;
    }
}
module.exports = { JWTCustom };
