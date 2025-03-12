import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

const adminMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id).select("-hashed_password");
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (user.user_type !== "admin") { 
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default adminMiddleware;