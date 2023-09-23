const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

require('dotenv').config({path: "../.env"})

cloudinary.config({
  // secure: true
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

// console.log(cloudinary.config());

const uploadImage = async (imagePath) => {

  const options = {
    useFilename: true,
    unique_filename: true,
    overwrite: true,
  };

  try {
    const result = cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return (await result).public_id;
  } catch (err) {
    console.error(err);
  }
}

const getImageInfo = async (publicId) => {
  const options = {

  }

  try {
    const result = await cloudinary.api.resource(publicId, options);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

const uploadUtil = async (imagePath) => {
  const result = await uploadImage(imagePath);
  const imageUrl = await getImageInfo(result);

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      console.log("Error: File not deleted.")
    } else {
      console.log("File deleted successfully");
    }
  });

  return imageUrl.secure_url;
}

module.exports = {
  uploadUtil
};