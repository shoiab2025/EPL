import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
  smId: { type: String, required: true },
  materialId: { type: String },
});

const Material = mongoose.model("Material", MaterialSchema);
export default Material;
