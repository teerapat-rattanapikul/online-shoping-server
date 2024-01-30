import express from 'express';
import userController from './user';
import merchantController from './merchant'
import productController from './product'
import createProductCategory from './productCategory'

const router = express.Router();

router.use('/api/users', userController);
router.use('/api/merchants', merchantController);
router.use('/api/products', productController);
router.use('/api/product/categories', createProductCategory);

export default router;