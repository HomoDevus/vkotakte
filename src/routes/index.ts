import express from 'express'

import { verifyUserToken, IsUser } from '../middleware/auth'
import { getUserInfo, updateUserInfo } from '../controllers/user'
import { register, login } from '../controllers/auth'
import { getAvatar, uploadAvatar } from "../controllers/image";

const router = express.Router()
// Auth
router.post('/login', login)
router.post('/register', register)

// Avatar
router.post('/upload-avatar', uploadAvatar)
router.get('/download-avatar/:avatarId', getAvatar)

// User
router.get('/user-info/:userId', verifyUserToken, IsUser, getUserInfo)
router.put('/user-info-update/', verifyUserToken, IsUser, updateUserInfo)

export default router
