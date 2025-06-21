const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: 'item_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req,file) => `${Date.now()}-${file.originalname}`,
  },
});


module.exports = {
  cloudinary,
  storage,
};