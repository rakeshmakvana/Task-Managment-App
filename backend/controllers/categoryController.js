import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";
import {
  cloudinaryImageDelete,
  cloudinaryUpload,
} from "../utils/cloudinary.js";
import { cloudPublicId } from "../helper/helpers.js";

export const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find().populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
  ]);

  if (category.length > 0) {
    res.json({ category, message: "Get All categorys" });
  }
  res.json({ message: "No categorys found" });
});

export const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
  ]);

  if (!category) {
    return res.status(400).json({ message: "Single category not found" });
  }

  res.json(category);
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, parentCategory, icon } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  const categoryCheck = await Category.findOne({ name });

  if (categoryCheck) {
    return res.status(400).json({ message: "category already exists" });
  }

  let catIcon = null;
  if (icon) {
    catIcon = icon;
  }

  let catPhoto = null;

  if (req.file) {
    const cat = await cloudinaryUpload(req);
    catPhoto = cat.secure_url;
  }

  const category = await Category.create({
    name,
    slug: createSlug(name),
    parentCategory: parentCategory ? parentCategory : null,
    icon: catIcon,
    photo: catPhoto,
  });

  if (parentCategory) {
    const parent = await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: category._id },
    });
  }

  if (category) {
    return res
      .status(201)
      .json({ message: "category created successful", category });
  } else {
    return res.status(400).json({ message: "Invalid category data" });
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (category.photo) {
    await cloudinaryImageDelete(cloudPublicId(category.photo));
  }
  if (!category) {
    return res.status(400).json({ message: "category delete failed" });
  }

  res.status(200).json({ category, message: "category delete successful" });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, icon } = req.body;

  if (!name) {
    return res.status(400).json({ message: "category name is required" });
  }

  const catUpdate = await Category.findById(id);

  let catIcon = catUpdate.icon;
  if (icon) {
    catIcon = icon;
  }

  let catPhoto = catUpdate.photo;
  if (req.file) {
    await cloudinaryImageDelete(cloudPublicId(catUpdate.photo));
    const photo = await cloudinaryUpload(req);
    catPhoto = photo.secure_url;
  }

  catUpdate.name = name;
  catUpdate.slug = createSlug(name);
  catUpdate.icon = catIcon;
  catUpdate.photo = catPhoto;
  catUpdate.save();

  res.status(200).json({
    message: `category updated successfull`,
    category: catUpdate,
  });
});

export const updateCategoryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  res.status(200).json({
    message: `category status updated successfull`,
    category: category,
  });
});
