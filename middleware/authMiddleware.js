// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import config from "../config.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(200)
      .json({ success: false, message: "Unauthorized access!" });
  }

  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided!" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
