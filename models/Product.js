import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Category from "./Category";
 
const productSchema = new Schema({
    title: {type: String},
    desc: {type: String},
    sku: {type: String},
    price: {type: Number},
    image_thumb: {type: String},
    categories: {type: mongoose.Schema.Types.ObjectId, ref:'Category'},
    created_date: {
        type: Date,
        default: Date.now
      },
});

export default mongoose.model("Product", productSchema);

