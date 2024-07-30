import express from 'express';
import { register, login, getAllDrivers, getDriverProfile, logout } from '../controllers/driver.controller.js';
import { verifyDriverEmail } from '../controllers/email.controller.js';
import authenticate from '../middleware/auth.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllDrivers);
router.get('/verify-email/:token', verifyDriverEmail);
router.get('/profile', authenticate, getDriverProfile);
router.post('/logout', logout);

export default router;