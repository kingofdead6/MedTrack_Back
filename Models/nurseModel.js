import mongoose from "mongoose";

const NurseSchema = new mongoose.Schema({
  healthcare_id: { type: mongoose.Schema.Types.ObjectId, ref: "HealthCare", required: true },
  ward: { type: String }, // Optional
  clinic_name: { type: String }, // Optional
});

export default mongoose.model("Nurse", NurseSchema);