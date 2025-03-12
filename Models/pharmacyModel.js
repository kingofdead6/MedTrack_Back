import mongoose from "mongoose";

const PharmacySchema = new mongoose.Schema({
  healthcare_id: { type: mongoose.Schema.Types.ObjectId, ref: "HealthCare", required: true },
  pharmacy_name: { type: String, required: true },
});

export default mongoose.model("Pharmacy", PharmacySchema);