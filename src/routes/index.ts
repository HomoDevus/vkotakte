import express from 'express';

import { verifyUserToken, IsUser } from '../middleware/auth';
import { getUserInfo, updateUserInfo } from '../controllers/user';
import { register, login } from '../controllers/auth';

const router = express.Router();

// User CRUD
router.post('/register', register);
router.get('/user-info/:userId', verifyUserToken, IsUser, getUserInfo);
router.put('/user-info-update/', verifyUserToken, IsUser, updateUserInfo);

// Login
router.post('/login', login);

export default router;
