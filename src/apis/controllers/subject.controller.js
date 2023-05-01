const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const genPaginationObject = require("../../providers/generatePaginationObject");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const {
    SubjectService
} = require("../../services/index.service");

class SubjectApiController {
    async get(req, res) {
        try {
            let subjectService = new SubjectService();
            let classes = await subjectService.select({},genPaginationObject(5,1,"updateAt",true))
            res.json(classes);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
    async getAll(req, res) {
        try {
            let subjectService = new SubjectService();
            let classes = await subjectService.select({})
            res.json(classes);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
}
module.exports = { SubjectApiController };
