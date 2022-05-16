const Router = require('express')
const router = new Router()
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const {
    registration,
    login,
    logout,
    getUsers,
    refresh,
    roleChange,
    deliteUser,
    blockChange,
    searchUsers
} = require('../controllers/userController')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 16 }),
    registration
);
router.post('/login', login)
router.post('/logout', logout)
router.post('/users/roleChange', authMiddleware, roleChange)
router.post('/users/deliteUser', authMiddleware, deliteUser)
router.post('/users/changeBlock', authMiddleware, blockChange)
router.post('/users/search', authMiddleware, searchUsers)
router.get('/users', authMiddleware, getUsers)
router.get('/refresh', refresh)

module.exports = router
