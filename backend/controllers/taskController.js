import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";
import { cloudPublicId } from "../helper/helpers.js";

export const getAllTask = asyncHandler(async (req, res) => {
  const task = await Task.find().populate("category").populate("tag");

  if (task.length > 0) {
    res.json({ task });
  }
  res.json({ message: "Tasks not found" });
});

export const getSingleTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return res.status(400).json({ message: "Single task not found" });
  }

  res.json(task);
});

export const createTask = asyncHandler(async (req, res) => {
  const { name, description, category, tag } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  const taskCheck = await Task.findOne({ name });

  if (taskCheck) {
    return res.status(400).json({ message: "Task already exists" });
  }

  const task = await Task.create({
    name,
    slug: createSlug(name),
    description,
    category: category,
    tag: tag,
  });

  if (task) {
    return res.status(201).json({ message: "Task created successful", task });
  } else {
    return res.status(400).json({ message: "Invalid task data" });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.status(400).json({ message: "Task delete failed" });
  }

  res.status(200).json({ task, message: "Task delete successful" });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, description, category, tag } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Task name is required" });
  }

  const task = await Task.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name), description, category, tag },
    { new: true }
  );

  res.status(200).json({
    message: `Task updated successfull`,
    task: task,
  });
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(id, { status }, { new: true });

  res.status(200).json({
    message: `Task status updated`,
    task: task,
  });
});
