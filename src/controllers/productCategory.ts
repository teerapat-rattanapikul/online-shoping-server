import { NextFunction, Request, Response } from 'express';
import ProductCategory from '../models/productCategory';

const createProductCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { productCategoryName } = req.body
  try {
    const findExistingProduct = await ProductCategory.findOne({ productCategoryName })
    if (findExistingProduct) {
      throw new Error('มีประเภทสินค้าที่มีชื่อนี้ในระบบแล้ว')
    } else {
      const result = await ProductCategory.create({
        productCategoryName
      })
  
      res.json(result)
    }
  } catch (error) {
    next(error)
  }
}

const inquiryProductCategoryLanding = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductCategory.find().limit(5).populate('products')

    res.json(result)
  } catch (error) {
    next(error)
  }
}

const inquiryAllProductCategoryList = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductCategory.find().select('_id, productCategoryName')

    res.json(result)
  } catch (error) {
    next(error)
  }
}

export {
  createProductCategory,
  inquiryProductCategoryLanding,
  inquiryAllProductCategoryList
}