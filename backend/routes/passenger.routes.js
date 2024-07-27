import express from 'express';
import { register, login, getAllPassengers } from '../controllers/passenger.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllPassengers);

export default router;