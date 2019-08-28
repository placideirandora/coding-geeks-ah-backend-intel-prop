import slugify from 'slug';
import uniqid from 'uniqid';
import { config } from 'dotenv';
import cloudinary from 'cloudinary';

config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

/**
 * @description creates a slug for articles
 * @param {object} title
 * @returns {object} slug
 */

const slugGen = title => `${slugify(title, { lower: true })}-${uniqid.process()}`;

/**
 * @description uploads images to cloudinary
 * @param {object} filename
 * @returns {object} image url from cloudinary
 */
const uploadImage = async (filename) => {
  if (filename) {
    const url = await cloudinary.v2.uploader.upload(filename.path);
    return url.secure_url;
  }
};

export { slugGen, uploadImage };
