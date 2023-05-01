const { ClassroomModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class ClassroomService {
    constructor() {}
    async selectAll() {
        try {
            const query = ClassroomModel.find({isCancelled : false});
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async getNewCode() {
        try {
            const query = ClassroomModel.find({isCancelled : false});
            let classrooms = await query.exec();
            let code = classrooms.length + 1;

            while (4 > code.toString().length) {
                code = "0" + code.toString();
            }
            let newCode = "MS" + code;
            return newCode;
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        filter.isCancelled = false;
        try {
            const query = ClassroomModel.find(filter);
            let page = pagination(query, paginate);
            let result = await query.exec();
            result.currentPage = page;
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    async selectIncludeDeleted(filter, paginate = null) {
        try {
            const query = ClassroomModel.find(filter);
            let page = pagination(query, paginate);
            let result = await query.exec();
            result.currentPage = page;
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        filter.isCancelled = false;
        try {
            const query = ClassroomModel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = ClassroomModel.findById(id);
            query.populate("tutorRegisted.tutor tutorRegisted.tuition")
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await ClassroomModel.create(data);
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            return await ClassroomModel.updateOne({ _id: id,isCancelled : false }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        filter.isCancelled = false;
        try {
            return await ClassroomModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async deleteById(id) {
        try {
            return await ClassroomModel.deleteOne({ _id: id,isCancelled : false });
        } catch (err) {
            console.log(err);
        }
    }
    async delete(filter) {
        filter.isCancelled = false;
        try {
            return await ClassroomModel.deleteMany(filter);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { ClassroomService };
