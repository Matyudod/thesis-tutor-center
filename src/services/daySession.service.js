const { DaySessionModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class DaySessionService {
    constructor() {}
    async selectAll() {
        try {
            const query = DaySessionModel.find();
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        try {
            const query = DaySessionModel.find(filter);
            pagination(query, paginate);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            const query = DaySessionModel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = DaySessionModel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await DaySessionModel.create(data);
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            return await DaySessionModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        try {
            return await DaySessionModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await DaySessionModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { DaySessionService };
