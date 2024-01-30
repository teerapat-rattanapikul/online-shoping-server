import express from 'express';
import { createUser, loginUser  } from '../controllers/user'

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);

export default router;