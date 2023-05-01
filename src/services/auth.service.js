const { UserModel } = require("../models/index.model");
const bcrypt = new require("bcrypt");
class AuthService {
    constructor() {}
    async login(user) {
        try {
            const query = UserModel.findOne(user);
            query.select("name username email isAdmin");
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async signUp(payload) {
        try {
            await UserModel.create(
                payload
            );
            let result = UserModel.findOne(payload);
            return await result.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async checkUser(username) {
        try {
            let result = await UserModel.findOne(
                {
                    username:username
                }
            ).exec();
            return result;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { AuthService };
