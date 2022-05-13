const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserControllerCheaks{
    async registrationCheak(req,next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Data entered incorrectly', errors.array()))
        }
    }

   
}

module.exports = new UserControllerCheaks();