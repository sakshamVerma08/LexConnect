import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.js";

export default (req, res, next) => {
  const token = req.header.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const isBlacklisted = Blacklist.findOne({ token });

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
