import express from 'express';

import { verifyUserToken, IsUser } from '../middleware/auth';
import { getUserInfo } from '../controllers/user';
import { register, login } from '../controllers/auth';

const router = express.Router();

// User CRUD
router.post('/register', register);
router.get('/user-info/:userId', verifyUserToken, IsUser, getUserInfo);

// Login
router.post('/login', login);

export default router;
