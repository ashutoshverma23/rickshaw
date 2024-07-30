import express from 'express';
import { register, login, getAllPassengers, getPassengerProfile, logout } from '../controllers/passenger.controller.js';
import { verifyPassengerEmail } from '../controllers/email.controller.js';
import authenticate from '../middleware/auth.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllPassengers);
router.get('/verify-email/:token', verifyPassengerEmail);
router.get('/profile', authenticate, getPassengerProfile);
router.post('/logout', logout);

export default router;