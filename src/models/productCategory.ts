import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './product'

export interface IProductCategory extends Document {
  productCategoryName: string;
  products: IProduct[];
  createdAt: Date;
  updatedAt: Date;
}

const productCategorySchema: Schema = new Schema({
  productCategoryName: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      require: false
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

productCategorySchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});
const ProductCategory = mongoose.model<IProductCategory>('ProductCategory', productCategorySchema);

export default ProductCategory;