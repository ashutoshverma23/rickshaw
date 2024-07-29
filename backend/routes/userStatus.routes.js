import express from 'express';

import { updateStatus, getActiveUsers } from '../controllers/userStatus.controller.js';

const router = express.Router();

router.put('/update-status', updateStatus);
router.get('/active-users', getActiveUsers);

export default router;