import { Schema, model } from "mongoose";

const invoiceSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Invoice = model('Invoice', invoiceSchema);
