import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {type: String},
    desc: {type: String},
    sku: {type: String},
    image_thumb: {type: String},
    created_date: {
        type: Date,
        default: Date.now
      },
});

export default mongoose.model("Product", productSchema);

