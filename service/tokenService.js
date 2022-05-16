const jwt = require('jsonwebtoken');
const {TokenShema} = require('../models/models')

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload,process.env.SECRET_KEY_ACCESS,{expiresIn: "30m"});
        const refreshToken = jwt.sign(payload,process.env.SECRET_KEY_ACCESS,{expiresIn: "5d"});
        return {accessToken,refreshToken}
    }
    async saveToken(userId,refreshToken){
        const tokenData = await TokenShema.findOne({where:{userId}})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenShema.create({userId,refreshToken})
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenShema.destroy({where:{refreshToken}})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenShema.findOne({where:{refreshToken}})
        return tokenData;
    }
    
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
            return userData;
        } catch (e) {
            return null;
        }
    }
}
module.exports = new TokenService();