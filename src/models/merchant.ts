import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './product'

export interface IMerchant extends Document {
  username: string;
  password: string;
  product: IProduct[];
  createdAt: Date;
  updatedAt: Date;
}

const merchantSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
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

merchantSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Merchant = mongoose.model<IMerchant>('Merchant', merchantSchema);

export default Merchant;