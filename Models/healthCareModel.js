import mongoose from "mongoose";

const HealthCareSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location_link: { type: String, required: true },
  healthcare_type: { type: String, enum: ["doctor", "nurse", "pharmacist", "clinic"], required: true },
  working_hours: { type: String, required: true },
  can_deliver: { type: Boolean, default: false },
  certificate: { type: String, required: true },
});

export default mongoose.model("HealthCare", HealthCareSchema);