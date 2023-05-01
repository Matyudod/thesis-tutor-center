const { TuitionModel } = require("../models/index.model");
const pagination = require("../providers/paginationModel");
class TuitionService {
    constructor() {}
    async selectAll() {
        try {
            const query = TuitionModel.find();
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectWithTeachingFormAndDayPerWeek(teachingForm, minDate, maxDate) {
        try {
            const query = TuitionModel.find({
                "teachingForm.teachingForm": teachingForm,
                $or: [
                    {
                        "dayPerWeek.dayPerWeek": minDate,
                    },

                    {
                        "dayPerWeek.dayPerWeek": maxDate,
                    },
                ],
            });
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async select(filter, paginate = null) {
        try {
            const query = TuitionModel.find(filter);
            pagination(query, paginate);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            const query = TuitionModel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            const query = TuitionModel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await TuitionModel.create(data);
        } catch (err) {
            console.log(err);
        }
    }
    async updateOne(id, data) {
        try {
            return await TuitionModel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    async update(filter, data) {
        try {
            return await TuitionModel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await TuitionModel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { TuitionService };
