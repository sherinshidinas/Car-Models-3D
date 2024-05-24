import mongoose from "mongoose";
const {Schema} = mongoose

const modelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  path: { type: String, required: false }
})

export default mongoose.model("Model", modelSchema)