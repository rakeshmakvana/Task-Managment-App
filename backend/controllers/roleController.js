import Role from "../models/Role.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";

export const getAllRole = asyncHandler(async (req, res) => {
  const role = await Role.find().select("-password").lean();

  if (role.length > 0) {
    res.json(role);
  }
});

export const getSingleRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findById(id).select("-password").lean();

  if (!role) {
    return res.status(400).json({ message: "Single Role not found" });
  }

  res.json(role);
});

export const createRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  const roleCheck = await Role.findOne({ name });

  if (roleCheck) {
    return res.status(400).json({ message: "Role already exists" });
  }

  const role = await Role.create({ name, slug: createSlug(name), permissions });

  if (role) {
    return res.status(201).json({ message: "Role created successful", role });
  } else {
    return res.status(400).json({ message: "Invalid Role data" });
  }
});

export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findByIdAndDelete(id);

  if (!role) {
    return res.status(400).json({ message: "Role delete failed" });
  }

  res.status(200).json({ role, message: "Role delete successful" });
});

export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, permissions } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  const role = await Role.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name), permissions },
    { new: true }
  );

  res.status(200).json({
    message: `Role updated successfull`,
    role: role,
  });
});

export const updateRoleStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const role = await Role.findByIdAndUpdate(id, { status }, { new: true });

  res.status(200).json({
    message: `Role status updated successfull`,
    role: role,
  });
});
