const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const { ScheduleService } = require("../../services/index.service");

class ImportCSSApiController {
    async get(req, res) {
        try {
            const path = require("path");
            const fs = require("fs");
            const pathFolder = path.join(__dirname, "../../public/css");
            let data = await fs.readdirSync(pathFolder);

            res.json(data);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
}
module.exports = { ImportCSSApiController };
