import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const tokenVerify = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        res.status(400).json({ message: "Invalid token" });
      }

      const me = await User.findOne({ email: decode.email })
        .select("-password")
        .populate("role");

      req.me = me;

      next();
    })
  );
};

export default tokenVerify;