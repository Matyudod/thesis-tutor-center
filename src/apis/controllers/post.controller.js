const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../../providers/database");
const customMessage = require("../../providers/customMessage");
const genPaginationObject = require("../../providers/generatePaginationObject");
const message = require("../../constants/message");
const scheme = require("../../constants/validation");
const {
    PostService
} = require("../../services/index.service");

class PostApiController {
    async get(req, res) {
        try {
            let postService = new PostService();
            let posts = await postService.select({},genPaginationObject(5,1,"updateAt",true))
            res.json(posts);
        } catch (e) {
            res.status(500).json(message.APIError);
        }
    }
}
module.exports = { PostApiController };
