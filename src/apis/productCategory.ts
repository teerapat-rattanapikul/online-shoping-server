import express from 'express';
import { createProductCategory, inquiryProductCategoryLanding, inquiryAllProductCategoryList } from '../controllers/productCategory'

const router = express.Router();

router.post('/create', createProductCategory);
router.get('/dashboard', inquiryProductCategoryLanding);
router.get('/master', inquiryAllProductCategoryList)

export default router;