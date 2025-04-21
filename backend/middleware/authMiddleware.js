import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.js";

export default async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  let isBlacklisted;

  try {
    isBlacklisted = await Blacklist.findOne({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "You are logged out, please log in again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
