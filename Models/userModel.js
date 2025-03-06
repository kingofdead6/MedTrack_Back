import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
        hashed_password: { type: String, required: true },
        phone_number: { type: String, required: true },
        user_type: { type: String, enum: ["patient", "healthcare", null], default: null },
        isApproved: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);
export default userModel;
