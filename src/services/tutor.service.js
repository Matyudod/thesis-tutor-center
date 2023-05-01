const { TutorModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class TutorService {
    constructor() {}
    async selectAll() {
        try {
            const query = TutorModel.find({isRemoved : false});
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        filter.isRemoved = false;
        try {
            const query = TutorModel.find(filter);
            pagination(query, paginate);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        filter.isRemoved = false;
        try {
            const query = TutorModel.findOne(filter); 
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = TutorModel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await TutorModel.create(data);
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            return await TutorModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        try {
            return await TutorModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await TutorModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { TutorService };
