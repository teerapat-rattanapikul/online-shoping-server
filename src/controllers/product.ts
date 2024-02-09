import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { merchantId, productCategoryId, productName, productDescription, productPrice, productImage } = req.body
  try {
    const findExistingProduct = await Product.findOne({ merchant: merchantId, productName })
    if (findExistingProduct) {
      throw new Error('มีสินค้าที่มีชื่อนี้ในระบบแล้ว')
    } else {
      const result = await Product.create({
        merchant: merchantId,
        productCategory: productCategoryId,
        productName,
        productDescription,
        productPrice,
        productImage
      })
  
      res.json(result)
    }
  } catch (error) {
    next(error)
  }
}

const inquiryByMerchantId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const productList = await Product.find().where('merchant').equals(id).sort({createdAt: 'desc'})

    res.json(productList)
  } catch (error) {
    next(error)
  }
}

export {
  createProduct,
  inquiryByMerchantId
}