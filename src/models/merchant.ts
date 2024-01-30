import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './product'

export interface IMerchant extends Document {
  username: string;
  password: string;
  product: IProduct[]
}

const merchantSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ]
});
const Merchant = mongoose.model<IMerchant>('Merchant', merchantSchema);

export default Merchant;