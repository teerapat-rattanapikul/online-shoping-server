import express from 'express';
import { createMerchant, loginMerchant  } from '../controllers/merchant'

const router = express.Router();

router.post('/create', createMerchant);
router.post('/login', loginMerchant);

export default router;