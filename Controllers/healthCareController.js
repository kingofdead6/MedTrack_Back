import HealthCare from "../Models/healthCareModel.js";
import Doctor from "../Models/doctorModel.js";
import Nurse from "../Models/nurseModel.js";
import Pharmacist from "../Models/pharmacistModel.js";
import Clinic from "../Models/clinicModel.js";
import userModel from "../Models/userModel.js";

export const registerHealthCareDetails = async (req, res) => {
  const { location_link, healthcare_type, working_hours, can_deliver, certificate, speciality, pharmacy_name, clinic_name } = req.body;
  const userId = req.user._id;

  try {
    const healthCare = new HealthCare({
      user_id: userId,
      location_link,
      healthcare_type,
      working_hours,
      can_deliver,
      certificate,
    });
    await healthCare.save();

    switch (healthcare_type) {
      case "doctor":
        await new Doctor({ healthcare_id: healthCare._id, speciality }).save();
        break;
      case "nurse":
        await new Nurse({ healthcare_id: healthCare._id }).save();
        break;
      case "pharmacist":
        await new Pharmacist({ healthcare_id: healthCare._id, pharmacy_name }).save();
        break;
      case "clinic":
        await new Clinic({ healthcare_id: healthCare._id, name: clinic_name }).save();
        break;
      default:
        return res.status(400).json({ message: "Invalid healthcare type" });
    }

    res.status(201).json({ message: "Healthcare details registered, awaiting approval" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveHealthCare = async (req, res) => {
  const { userId } = req.body; // Admin endpoint
  try {
    const user = await userModel.findById(userId);
    if (!user || user.user_type !== "healthcare") {
      return res.status(404).json({ message: "User not found or not healthcare" });
    }
    user.isApproved = true;
    await user.save();
    res.status(200).json({ message: "Healthcare provider approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};