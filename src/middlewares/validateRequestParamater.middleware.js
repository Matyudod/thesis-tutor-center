const Validator = require("fastest-validator");
module.exports = function (params, schema) {
    const v = new Validator();
    let validationResponse = v.validate(params, schema);
    return validationResponse !== true ? false : true;
};
