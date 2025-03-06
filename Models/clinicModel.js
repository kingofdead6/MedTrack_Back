import mongoose from "mongoose";

const ClinicSchema = new mongoose.Schema({
  healthcare_id: { type: mongoose.Schema.Types.ObjectId, ref: "HealthCare", required: true },
  name: { type: String, required: true },
});

export default mongoose.model("Clinic", ClinicSchema);