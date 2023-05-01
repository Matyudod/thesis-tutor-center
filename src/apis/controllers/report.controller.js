const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const genPaginationObject = require("../../providers/generatePaginationObject");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const {
    ReportService
} = require("../../services/index.service");

class ReportApiController {
    async rate(req, res) {
        try {
            let reportService = new ReportService();
            let reports = await reportService.selectAll()
            let rate = 0;
            for(let item of reports){
                rate += item.score;
            }
            rate = Math.floor(rate / reports.length) ;
            res.json({rate:rate});
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
}
module.exports = { ReportApiController };
