const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const genPaginationObject = require("../../providers/generatePaginationObject");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const {
    ClassroomService
} = require("../../services/index.service");

class ClassroomApiController {
    async search(req, res) {
        try {
            let searchText = req.body.searchText;
            let classroomService = new ClassroomService();
            let course = await classroomService.selectOne({ "code": { $regex: '.*' + searchText + '.*' } });
            if(course != null){
                res.json({id:course._id,price:course.currentFee ?? course.maxFee});
            } else {
                res.json(null);
            }
            
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
}
module.exports = { ClassroomApiController };
