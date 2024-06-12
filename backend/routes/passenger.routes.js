import express from 'express';
import { register, sendRegisterOTP } from '../controllers/passenger.controller.js';

const router = express.Router();


router.post('/register', register);
router.post('/sendRegisterOTP', sendRegisterOTP);

export default router;