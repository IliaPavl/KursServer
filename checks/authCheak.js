const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/tokenService');

class AuthCheak{
    headrCheak(req,next){
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
    }
    accessTokenCheak(req,next){
        const authorizationHeader = req.headers.authorization;
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
    }

    userDataCheak(next){
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
    }
}
module.exports = new AuthCheak();