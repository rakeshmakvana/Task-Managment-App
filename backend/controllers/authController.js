import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required!" });
  }

  const loginUser = await User.findOne({ email }).populate("role");

  if (!loginUser) {
    res.status(400).json({ message: "User not found!" });
  }

  const passCheck = await bcrypt.compare(password, loginUser.password);

  if (!passCheck) {
    res.status(400).json({ message: "Wrong password" });
  }

  const accessToken = jwt.sign(
    { email: loginUser.email, role: loginUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 15,
  });

  res.status(200).json({
    token: accessToken,
    user: loginUser,
    message: "User Logged in successful",
  });
});

export const refreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.rToken) {
    return res.status(400).json({ message: "invalid token request" });
  }
  const token = cookies.rToken;

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({ message: "Token not match" });
      }

      const tokenUser = await User.findOne({ email: decode.email });
      if (!tokenUser) {
        return res.status(404).json({ message: "Token user not found" });
      }

      const accessToken = jwt.sign(
        { email: tokenUser.email, role: tokenUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
      );

      res.status(200).json({ message: accessToken });
    })
  );
};

export const userLogout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies.accessToken) {
    return res.status(400).json({ message: "Already logged out!" });
  }
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
    })
    .json({ message: "Logged out okay" });
};

export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash });

  res.status(200).json({
    user,
    message: "User Created successful",
  });
});

export const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});
