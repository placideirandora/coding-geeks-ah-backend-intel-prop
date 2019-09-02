import slugify from 'slug';
import uniqid from 'uniqid';
import { config } from 'dotenv';
import cloudinary from 'cloudinary';
import Sequelize from 'sequelize';
import { User } from '../../sequelize/models';

config();
const { Op } = Sequelize;
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

/**
 * @description filters query parameters
 * @param {string} title
 * @param {string} author
 * @param {object} tag
 * @returns {object} filtered wuery params
 */
const queryFilterer = (title) => {
  const queries = {
    title: {
      [Op.iLike]: `%${title}%`
    }
    // where: Sequelize.where(Sequelize.fn('concat', Sequelize.col('User.firstName'), ' ', Sequelize.col('User.lastName')), {
    //   [Op.iLike]: `%${author}%`

  };
  // if (!author) delete queries.query.where;
  return {
    where: { ...queries }
  };
};

export { slugGen, uploadImage, queryFilterer };
