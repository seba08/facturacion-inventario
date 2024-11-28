import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    imageUrl: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });


  const Product = model("Product", productSchema);
  export default Product;