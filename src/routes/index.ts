import express from 'express';

import { verifyUserToken, IsAdmin, IsUser } from '../middleware/auth';
import { register, login, userEvent, adminEvent } from '../controllers/user';

const router = express.Router();

// Register a new User
router.post('/register', register);

// Login
router.post('/login', login);

// Auth user only
router.get('/events', verifyUserToken, IsUser, userEvent);

// Auth Admin only
router.get('/special', verifyUserToken, IsAdmin, adminEvent);

export default router;
