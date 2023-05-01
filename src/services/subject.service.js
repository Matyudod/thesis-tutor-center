const { SubjectModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class SubjectService {
    constructor() {}
    async selectAll() {
        try {
            const query = SubjectModel.find();
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        try {
            const query = SubjectModel.find(filter);
            pagination(query, paginate);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            const query = SubjectModel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = SubjectModel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await SubjectModel.create(data);
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            return await SubjectModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        try {
            return await SubjectModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await SubjectModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { SubjectService };
