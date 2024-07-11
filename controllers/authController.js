// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error logging in", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: config.jwtLifetime,
    });
    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: { username: user.username, email: user.email, token },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error logging in", error });
  }
};

export { login, signup };
