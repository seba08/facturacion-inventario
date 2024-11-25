import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});


export const Category = model('Category', categorySchema);
export default Category;