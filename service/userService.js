const { User, TokenShema } = require('../models/models')
const UserDTO = require('../dtos/userDTO')
const Cheaks = require('../checks/userServiceCheaks')
const bcrypt = require('bcryptjs')
const tokenService = require('./tokenService')
const roleServise = require('./roleServise')
const Sequelize = require("sequelize");
const { where } = require('sequelize')
const Op = Sequelize.Op;

require('dotenv').config()

class UserService {
    async registration(email, login, password) {
        await Cheaks.cheakEmail(email);
        await Cheaks.cheakEmail(login);
        const hasPassword = await bcrypt.hash(password, 3);
        const user = await User.create({ email, password: hasPassword, login, role_id: 2 });
        return this.save(user);
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        await Cheaks.cheakLoginEmail(email);
        await Cheaks.cheakPassword(password, email);
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
        await Cheaks.cheakRefreshToken2(userData, tokenFromDb);
        const user = await User.findOne({ where: { id: userData.id } });
        return this.save(user);
    }

    async save(user) {
        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateToken({ ...userDTO });
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);
        return { ...tokens, user: userDTO }
    }

    async getUsers() {
        const users = await User.findAll();
        return users;
    }

    async getUser(id) {
        const user = await User.findById({ where: { id } });
        return user;
    }

    async generateStartAdmin() {
        if (!await User.findOne({ where: { email: process.env.ADMIN_EMAIL } })) {
            const hasPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 3);
            const admin = await User.create({
                email: process.env.ADMIN_EMAIL,
                password: hasPassword,
                login: process.env.ADMIN_LOGIN,
                role_id: 1
            });
            this.save(admin)
        }
    }

    async changeRole(req, res) {
        var { id } = req.body
        console.log(id[0] + "/////////////////")
        for (var i in id) {
            var user = await User.findOne({ where: { id: id[i] } })
            if (user.role_id == 1) { user.role_id = 2 } else { user.role_id = 1 }
            user.save()
        }
        const users = await User.findAll();
        return res.json(users);
    }

    async deliteUsers(req, res) {
        const { id } = req.body
        User.destroy({ where: { id } })
        const users = await User.findAll()
        return res.json(users)
    }

    async changeBlock(req, res) {
        const { id } = req.body
        for (var i in id) {
            var user = await User.findOne({ where: { id: id[i] } })
            if (user.isBanned) { user.isBanned = false } else { user.isBanned = true }
            user.save()
        }
        const users = await User.findAll()
        return res.json(users)
    }

    async searchUsers(req, res) {
        const { searchLable } = req.body
        
            var users = await User.findAll()
        
        return res.json(users)
    }
}
module.exports = new UserService();