const ApiError = require('../exceptions/api-error');
const {User} = require('../models/models')
const bcrypt = require('bcryptjs');



class UserServiceCheaks{
    
    async cheakEmail(email){
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            throw ApiError.BadRequest('User with email is'+email+' enable')
        }
    }

    async cheakLogin(login){
        const candidate = await User.findOne({where: {login}})
        if(candidate){
            throw ApiError.BadRequest('User with login is'+login+' enable')
        }
    }
    async cheakLoginEmail(email){
        const candidate = await User.findOne({where: {email}})
        if(!candidate){
            throw ApiError.BadRequest('User with email is'+email+' not found')
        }
    }
    async cheakPassword(password1,email){
        const user = await User.findOne({where: {email}})
        const isPassEquals = await bcrypt.compare(password1, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password');
        }
    }
    async cheakRefreshToken(refreshToken){
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
    }
    
    async cheakRefreshToken(userData,tokenFromDb){
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
    }

}

module.exports = new UserServiceCheaks();