const { ScheduleModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class ScheduleService {
    constructor() {}
    async selectAll() {
        try {
            const query = ScheduleModel.find();
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectWithSessionAndDayWeek(daySession, dayWeek) {
        try {
            const query = ScheduleModel.findOne({
                daySession: daySession,
                dayWeek: dayWeek,
            });
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }

    async select(filter, paginate = null) {
        try {
            const query = ScheduleModel.find(filter);
            pagination(query, paginate);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            const query = ScheduleModel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = ScheduleModel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await ScheduleModel.create(data);
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            return await ScheduleModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        try {
            return await ScheduleModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await ScheduleModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { ScheduleService };
