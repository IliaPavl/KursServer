const Router = require('express')
const { registration, login, logout, active, getUsers } = require('../controllers/userController')
const router = new Router()

router.post('/registration', registration)
router.post('/login', login)
router.post('/logout', logout)
router.get('/activate/:link', active)
router.get('/users', getUsers)

module.exports = router
