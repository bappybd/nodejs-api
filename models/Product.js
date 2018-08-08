import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Category from "./Category";
 
const productSchema = new Schema({
    title: {type: String, unique: true, required: [true, "Title cannot be empty."]},
    desc: {type: String},
    sku: {type: String},
    price: {type: Number, required: [true, "cannot be empty."]},
    image_thumb: {type: String},
    categories: {type: mongoose.Schema.Types.ObjectId, ref:'Category'},
    created_date: {
        type: Date,
        default: Date.now
      }
}, {timestamps: true});

export default mongoose.model("Product", productSchema);

