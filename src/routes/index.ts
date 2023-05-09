import express from 'express'

import { verifyUserToken, IsUser } from '../middleware/auth'
import { getUserInfo, updateUserInfo } from '../controllers/user'
import { register, login } from '../controllers/auth'
import { getAvatar, uploadImage } from "../controllers/image";
import { addPublication, getUserPublications } from "../controllers/publication";

const router = express.Router()
// Auth
router.post('/login', login)
router.post('/register', register)

// Avatar
router.post('/upload-image', uploadImage)
router.get('/download-image/:imageId', verifyUserToken, IsUser, getAvatar)

// User
router.get('/user-info/:userId', verifyUserToken, IsUser, getUserInfo)
router.put('/user-info-update/', verifyUserToken, IsUser, updateUserInfo)

// Publications
router.post('/add-publication', verifyUserToken, IsUser, addPublication)
router.get('/publications/:userId', verifyUserToken, IsUser, getUserPublications)

export default router
