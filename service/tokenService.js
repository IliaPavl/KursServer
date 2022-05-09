const jwt = require('jsonwebtoken');
const {TokenShema} = require('../models/models')

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload,process.env.SECRET_KEY_ACCESS,{expiresIn: "5m"});
        const refresh = jwt.sign(payload,process.env.SECRET_KEY_ACCESS,{expiresIn: "5d"});
        return {accessToken,refresh}
    }
    async saveToken(userId,refresh){
        const tokenData = await TokenShema.findOne({where:{userId}})
        if(tokenData){
            tokenData.refreshToken = refresh;
            return tokenData.save();
        }
        const token = await TokenShema.create({userId,refresh})
        return token;
    }
}
module.exports = new TokenService();