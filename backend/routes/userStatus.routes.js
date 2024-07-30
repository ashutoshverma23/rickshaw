import express from 'express';

import { updateStatus, getActiveUsers, getUserStatus } from '../controllers/userStatus.controller.js';

const router = express.Router();

router.put('/update-status', updateStatus);
router.get('/active-users', getActiveUsers);
router.get('/:userId', getUserStatus);

export default router;