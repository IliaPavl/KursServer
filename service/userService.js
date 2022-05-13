const {User,TokenShema} = require('../models/models')
const UserDTO = require('../dtos/userDTO')
const ApiError = require('../exceptions/api-error');
const Cheaks = require('../checks/userServiceCheaks')

const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')

class UserService{
    async registration(email,login,password){
        await Cheaks.cheakEmail(email);
        await Cheaks.cheakEmail(login);
        const hasPassword = await bcrypt.hash(password,3);
        const user = await User.create({email,password: hasPassword,login});
        return this.save(user);
    }
    
    async login(email, password) {
        const user = await User.findOne({where: {email}})
        await Cheaks.cheakLoginEmail(email);
        await Cheaks.cheakPassword(password,email);
        return this.save(user)
    }
    
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        await Cheaks.cheakRefreshToken(refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        await Cheaks.cheakRefreshToken(userData,tokenFromDb);
        const user = await User.findById({where: {id: userData.id}});
        return this.save(user);
    }

    async save(user) {
        const userDTO = new UserDTO(user);
        const tokens= tokenService.generateToken({...userDTO});
        await tokenService.saveToken(userDTO.id,tokens.refreshToken);
        return {...tokens, user: userDTO}
    }

    async getUsers() {
        const users = await User.findAll();
        return users;
    }

    async getUser(id) {
        const user = await User.findById({where: {id}});
        return user;
    }

    
}
module.exports = new UserService();