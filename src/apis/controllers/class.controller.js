const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const genPaginationObject = require("../../providers/generatePaginationObject");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const {
    ClassService
} = require("../../services/index.service");

class ClassApiController {
    async get(req, res) {
        try {
            let classService = new ClassService();
            let classes = await classService.select({},genPaginationObject(5,1,"updateAt",true))
            res.json(classes);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
}
module.exports = { ClassApiController };
