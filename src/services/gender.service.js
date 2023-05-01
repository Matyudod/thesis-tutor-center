const { GenderModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class GenderService {
    constructor() {}
    async selectAll() {
        try {
            const query = GenderModel.find();
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        try {
            const query = GenderModel.find(filter);
            pagination(query, paginate);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            const query = GenderModel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = GenderModel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await GenderModel.create(data);
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            return await GenderModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        try {
            return await GenderModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await GenderModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { GenderService };
