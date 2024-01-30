import mongoose, { Schema, Document } from 'mongoose';
import { IMerchant } from './merchant'
import { IProductCategory } from './productCategory'

export interface IProduct extends Document {
  productName: string;
  productDescription?: string;
  productPrice?: number;
  productImage?: string;
  merchant: IMerchant;
  productCategory: IProductCategory;
}

const productSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: false },
  productPrice: { type: Number, require: true },
  productImage: { type: String, required: false },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    require: true
  },
  productCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    require: true
  }
});

productSchema.post('save', async function (doc, next) {
  try {
    await mongoose.model('Merchant').updateOne(
      { _id: doc.merchant },
      { $addToSet: { products: doc._id } }
    );

    await mongoose.model('ProductCategory').updateOne(
      { _id: doc.productCategory },
      { $addToSet: { products: doc._id } }
    );

    next();
  } catch (error: any) {
    next(error);
  }
});


const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;