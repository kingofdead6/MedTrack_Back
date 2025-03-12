import mongoose from "mongoose";

const LaboratorySchema = new mongoose.Schema({
  healthcare_id: { type: mongoose.Schema.Types.ObjectId, ref: "HealthCare", required: true },
  lab_name: { type: String, required: true },
  equipment: { type: String }, 
  clinic_name: { type: String },
});

export default mongoose.model("Laboratory", LaboratorySchema);