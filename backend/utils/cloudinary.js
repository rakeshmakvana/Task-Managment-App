import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dwvw7qjhc",
  api_key: "314617868791443",
  api_secret: "QxOC9ZZgzlLs_smtURSDjejqAi8",
});

export const cloudinaryUpload = async (req) => {
  const data = await cloudinary.v2.uploader.upload(req.file.path);

  return data;
};

export const cloudinaryUploads = async (path) => {
  const data = await cloudinary.v2.uploader.upload(path);
  return data.secure_url;
};

export const cloudinaryImageDelete = async (publicId) => {
  await cloudinary.v2.uploader.destroy(publicId);
};
