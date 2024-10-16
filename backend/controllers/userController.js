import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { sendMail } from "../utils/sendMail.js";
import { cloudPublicId } from "../helper/helpers.js";
import {
  cloudinaryImageDelete,
  cloudinaryUpload,
} from "../utils/cloudinary.js";

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("role");

  if (!users?.length) {
    return res.status(400).json({ message: "Not user found" });
  }

  res.status(200).json(users);
});

export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }

  res.json(user);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !password || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash, role });

  sendMail({
    to: email,
    sub: "Account access info",
    msg: `Your account login access is ${email} and password is ${password}`,
  });

  if (user) {
    return res
      .status(201)
      .json({ message: `${name} User created successful`, user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(400).json({ message: "User delete failed" });
  }

  res.json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, email, password, role, mobile, address, birth } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.name = name;
  user.email = email;
  user.mobile = mobile ?? mobile;
  user.address = address ?? address;
  user.birth = birth ?? birth;
  user.role = role;

  const updateUserData = await user.save();

  res.json({ message: `User updated successfull`, user: updateUserData });
});

export const updateUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { password, newpassword, confirmpassword } = req.body;

  if (!password || !newpassword || !confirmpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newpassword !== confirmpassword) {
    return res.status(400).json({ message: "Password Not Match!" });
  }

  const user = await User.findById(id).exec();

  const passCheck = await bcrypt.compare(password, user.password);

  if (!passCheck) {
    res.status(400).json({ message: "Wrong password" });
  }

  user.password = await bcrypt.hash(newpassword, 10);

  const updateUserData = await user.save();

  res.json({ message: `Password Updated Successfully`, user: updateUserData });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const user = await User.findByIdAndUpdate(id, { status }, { new: true });

  res.status(200).json({
    message: `User status updated successfull`,
    user: user,
  });
});

export const updateProfilePicture = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userProfile = await User.findById(id);

  let updatePhoto = userProfile.photo;

  if (req.file) {
    const publicId = cloudPublicId(
      userProfile.photo ? userProfile.photo : "123"
    );
    await cloudinaryImageDelete(publicId);
    const photo = await cloudinaryUpload(req);
    updatePhoto = photo.secure_url;
  }

  userProfile.photo = updatePhoto;

  userProfile.save();

  res.status(200).json({
    message: `Profile picture updated successfully`,
    user: userProfile,
  });
});
