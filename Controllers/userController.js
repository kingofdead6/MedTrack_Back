import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import nodemailer from "nodemailer";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const sendEmail = async (toEmail, subject, html) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject,
      html,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${toEmail}`);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; 
    }
  };

export const registerUser = async (req, res) => {
  const { name, email, password, phone_number, user_type } = req.body;

  try {
    if (!name || !email || !password || !phone_number || !user_type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
      return res.status(400).json({ message: "Password must be strong" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const user = new userModel({
      name,
      email,
      hashed_password,
      phone_number,
      user_type,
      isApproved: user_type === "patient", 
    });
    await user.save();

    const token = createToken(user._id);

    if (user_type === "healthcare") {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "New Healthcare Provider Registration",
        `<p>Please approve ${name} (${email}) as a healthcare provider.</p>`
      );
    }

    res.status(201).json({ token, user: { _id: user._id, name, email, user_type, isApproved: user.isApproved } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.status(200).json({ token, user: { _id: user._id, name: user.name, email, user_type: user.user_type, isApproved: user.isApproved } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          user_type: user.user_type,
          isApproved: user.isApproved,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };