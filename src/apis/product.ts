import express from 'express';
import { createProduct, inquiryByMerchantId } from '../controllers/product'

const router = express.Router();

router.post('/create', createProduct);
router.get('/merchant/:id', inquiryByMerchantId);

export default router;