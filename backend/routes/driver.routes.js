import express from 'express';
import { register, login, getAllDrivers } from '../controllers/driver.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllDrivers);

export default router;