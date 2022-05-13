const ApiError = require('../exceptions/api-error');
//const tokenService = require('../service/token-service');
const AuthCheak = require('../checks/authCheak')

module.exports = function (req, res, next) {
    try {
        AuthCheak.headrCheak(req,next);
        AuthCheak.accessTokenCheak(req,next);
        AuthCheak.userDataCheak(next);
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
