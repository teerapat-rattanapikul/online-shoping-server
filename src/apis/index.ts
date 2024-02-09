import express from 'express';
import userController from './user';
import merchantController from './merchant'
import productController from './product'
import createProductCategory from './productCategory'

const router = express.Router();

router.use('/users', userController);
router.use('/merchants', merchantController);
router.use('/products', productController);
router.use('/product/categories', createProductCategory);

export default router;