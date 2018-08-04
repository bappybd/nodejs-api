import mongoose from "mongoose";
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    title: {type: String},
    desc: {type: String},
    created_date: {
        type: Date,
        default: Date.now
      },
});

export default mongoose.model("Category", categorySchema);

