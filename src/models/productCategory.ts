import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './product'

export interface IProductCategory extends Document {
  productCategoryName: string;
  products: IProduct[];
}

const productCategorySchema: Schema = new Schema({
  productCategoryName: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      require: false
    },
  ]
});
const ProductCategory = mongoose.model<IProductCategory>('ProductCategory', productCategorySchema);

export default ProductCategory;