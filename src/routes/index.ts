import express from 'express'

import { verifyUserToken, IsUser } from '../middleware/auth'
import {
  addFriend,
  getUserInfo,
  getUsersList,
  removeFriend,
  updateUserInfo,
} from '../controllers/user'
import { register, login } from '../controllers/auth'
import { getAvatar, uploadImage } from '../controllers/image'
import { addPublication, getUserPublications } from '../controllers/publication'

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
router.get('/users', verifyUserToken, IsUser, getUsersList)
router.post('/add-friend', verifyUserToken, IsUser, addFriend)
router.post('/remove-friend', verifyUserToken, IsUser, removeFriend)

// Publications
router.post('/add-publication', verifyUserToken, IsUser, addPublication)
router.get(
  '/publications/:userId',
  verifyUserToken,
  IsUser,
  getUserPublications,
)

export default router
