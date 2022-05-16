const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/tokenService');

class AuthCheak{
    headrCheak(req,next){
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            console.log("header ")
            return next(ApiError.UnauthorizedError());
        }
    }

    accessTokenCheak(req,next){
        const authorizationHeader = req.headers.authorization;
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            console.log("acess ")
            return next(ApiError.UnauthorizedError());
        }
    }

    userDataCheak(req, next){
        const authorizationHeader = req.headers.authorization;
        const accessToken = authorizationHeader.split(' ')[1];
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            console.log("user Data ")
            return next(ApiError.UnauthorizedError());
        }
        return userData;
    }
}
module.exports = new AuthCheak();