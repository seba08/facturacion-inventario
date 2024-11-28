import { Schema, model } from "mongoose";


const customerSchema = new Schema({
  cedula: {type: String, required: true},
  name: { type: String, required: true },
  last: { type: String },
  email: { type: String },
  contact:{
      address: { type: String },
      phone: { type: String, default: "00-000-0000" },
    },
  birth: { type: Date, default: "1990-01-01"},
  createdAt: { type: Date, default: Date.now }
});

const Customer = model('Customer', customerSchema);
export default Customer;