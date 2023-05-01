const { PostModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class PostService {
    constructor() {}
    async selectAll() {
        try {
            const query = PostModel.find();
            let datas = await query.exec();

            return datas;
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        try {
            const query = PostModel.find(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            const query = PostModel.findOne(filter);
            let data = await query.exec();
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = PostModel.findById(id);
            let data = await query.exec();
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            let datas = await PostModel.create(data);
            return datas;
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        data.updateAt = new Date();
        try {
            return await PostModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        data.updateAt = new Date();
        try {
            return await PostModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await PostModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { PostService };
