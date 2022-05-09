const {User,TokenShema} = require('../models/models')
const UserDTO = require('../dtos/userDTO')

const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')

class UserService{
    async registration(email,login,password){
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            throw new Error('User with email is'+email+' enable')
        }
        const candidate2 = await User.findOne({where: {login}})
        if(candidate2){
            throw new Error('User with login is'+login+' enable')
        }
        const hasPassword = await bcrypt.hash(password,3);
        const activationLink = uuid.v4();
        const user = await User.create({email,password:hasPassword,login,activationLink});
        await mailService.sendMail(email,activationLink);
        const userDTO =new UserDTO(user); 
        const tokens= tokenService.generateToken({...userDTO});

        await tokenService.saveToken(userDTO.id,tokens.refresh);
        return{...tokens,user: userDTO}
    }
}
module.exports = new UserService();