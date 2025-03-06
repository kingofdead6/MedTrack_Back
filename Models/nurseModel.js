import mongoose from "mongoose";

const NurseSchema = new mongoose.Schema({
  healthcare_id: { type: mongoose.Schema.Types.ObjectId, ref: "HealthCare", required: true },
});

export default mongoose.model("Nurse", NurseSchema);