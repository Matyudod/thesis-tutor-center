const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const generatePaginationObject = require("../../providers/generatePaginationObject");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const {
    ScheduleService,
    DaySessionService,
    DayWeekService,
    TutorService,
    TuitionService
} = require("../../services/index.service");

class TutorApiController {
    async getWithArrayId(req, res) {
        try {
            let tutorService = new TutorService();
            let array = JSON.parse(req.cookies.listChosenTutors);
            let tutors = []; 
            for(let item of array){
                let tutor = await tutorService.selectById(item);
                tutors.push(tutor);
            }
            res.json(tutors);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
    async getListAvartar(req, res){
        try {
            let tutorService = new TutorService();
            let tutors = await tutorService.select({},generatePaginationObject(10,1,"point",true));
            let result = tutors.map(x => x.avartar);
            res.json(result);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
    
    async getSearchTutor(req, res){
        try {
            let searchString = req.query.searchString;
            let tutorService = new TutorService();
            let tutors = await tutorService.select({ "name": { $regex: '.*' + searchString + '.*' } });
            let result = tutors.map(x => {
                return {
                    _id: x._id,
                    avartar:x.avartar,
                    name:x.name,
                    level: x.tutorQualification.level
                }
            }
            );
            res.json(result);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
    
    async getSearchPriceOfTutor(req, res){
        try {
            let searchString = req.query.searchString;
            let tutorService = new TutorService();
            let tuitionService = new TuitionService();
            let tutor = await tutorService.selectOne({ "name": { $regex: '.*' + searchString + '.*' } });
            let tuitions = await tuitionService.selectOne({tutorQualification:tutor.tutorQualification});
            res.json(tuitions);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
}
module.exports = { TutorApiController };
