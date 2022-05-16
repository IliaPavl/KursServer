const { User } = require('../models/models');
const userServise = require('../service/userService')
const Cheaks = require('../checks/userControllerCheaks')



require('dotenv').config()



class UserController {
    async registration(req, res, next) {
        try {
            await Cheaks.registrationCheak(req, next);
            const { email, password, login, refreshToken } = req.body;
            if (refreshToken) { await logout(req, res, next) }
            const userData = await userServise.registration(email, login, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.redirect('/Home')
            return res.json(userData);
        } catch (e) { next(e) }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (refreshToken) {
                const token = await userServise.logout(refreshToken);
                res.clearCookie('refreshToken');
                res.clearCookie('accessToken');
                return res.json(token);
            }
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userServise.getUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password, refreshToken } = req.body;
            if (refreshToken) { await logout(req, res, next) }
            const userData = await userServise.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async newPassword(req, res) {
        try { } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            console.log("Token:" + refreshToken);
            const userData = await userServise.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async deliteUser(req, res) {
        try {
            const users = await userServise.deliteUsers(req, res)
            return users;
        } catch (e) {
            next(e);
        }
    }

    async roleChange(req, res) {
        try {
            const users = await userServise.changeRole(req, res)
            return users;
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async blockChange(req, res) {
        try {
            const users = await userServise.changeBlock(req, res)
            return users;
        } catch (e) {
            console.log(e)
            next(e);
        }
    } 

    async searchUsers(req, res, next) {
        try {
            const users = await userServise.searchUsers(req, res)
            return users;
        } catch (e) {
            console.log(e)
            next(e);
        }
    } 

}

module.exports = new UserController()
