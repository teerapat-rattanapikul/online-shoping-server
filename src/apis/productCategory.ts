import express from 'express';
import { createProductCategory, inquiryProductCategoryList } from '../controllers/productCategory'

const router = express.Router();

router.post('/create', createProductCategory);
router.get('/', inquiryProductCategoryList);

export default router;