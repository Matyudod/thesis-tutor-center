const { UserModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class UserService {
    constructor() {}
    async selectAll() {
        try {
            const query = UserModel.find({ isAdmin: false });
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        try {
            filter.isAdmin = false;
            const query = UserModel.find(filter);
            pagination(query, paginate);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            filter.isAdmin = false;
            const query = UserModel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = UserModel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            data.isAdmin = false;
            return await UserModel.create(data);
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            data.isAdmin = false;
            return await UserModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        try {
            filter.isAdmin = false;
            data.isAdmin = false;
            return await UserModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await UserModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { UserService };
