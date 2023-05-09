import express from 'express'

import { verifyUserToken, IsUser } from '../middleware/auth'
import { getUserInfo, updateUserInfo } from '../controllers/user'
import { register, login, uploadAvatar } from '../controllers/auth'

const router = express.Router()
// Login
router.post('/login', login)
router.post('/upload-avatar', uploadAvatar)

// User CRUD
router.post('/register', register)
router.get('/user-info/:userId', verifyUserToken, IsUser, getUserInfo)
router.put('/user-info-update/', verifyUserToken, IsUser, updateUserInfo)

export default router
