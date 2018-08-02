const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {type: String},
    desc: {type: String},
    sku: {type: String},
    image_thumb: {type: String}
});

module.exports = mongoose.model("Product", productSchema);

