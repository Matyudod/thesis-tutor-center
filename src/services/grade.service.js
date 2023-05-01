const { GradeModel, ClassModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class GradeService {
    constructor() {}
    async selectAll() {
        try {
            const query = GradeModel.find();
            let datas = await query.exec();

            return datas;
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        try {
            const query = GradeModel.find(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            const query = GradeModel.findOne(filter);
            let result = await query.exec();
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = GradeModel.findById(id);
            let data = await query.exec();
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            let datas = await GradeModel.create(data);
            return datas;
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            return await GradeModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        try {
            return await GradeModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await GradeModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { GradeService };
