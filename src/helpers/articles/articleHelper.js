import slugify from 'slug';
import uniqid from 'uniqid';
import { config } from 'dotenv';

// import cloudinary from 'cloudinary';
import Sequelize from 'sequelize';

config();
const { Op } = Sequelize;
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY,
// });

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
// const uploadImage = async (filename) => {
//   if (filename) {
//     const url = await cloudinary.v2.uploader.upload(filename.path);
//     return url.secure_url;
//   }
// };

/**
 * @description filters query parameters
 * @param {string} title
 * @param {string} author
 * @param {object} tags
 * @returns {object} filtered query params
 */
const queryFilterer = (title, author, tags) => {
  const queries = {
    query: {
      title: {
        [Op.iLike]: `%${title}%`
      },
      where: Sequelize.where(
        Sequelize.fn(
          'concat',
          Sequelize.col('author.firstName'),
          ' ',
          Sequelize.col('author.lastName'),
          ' ',
          Sequelize.col('author.userName')
        ),
        {
          [Op.iLike]: `%${author}%`
        }
      ),
      tagList: {
        [Op.contains]: `${tags}`.toLocaleLowerCase().trim().split(/[ ,]+/)
      },
      blocked: false
    }
  };
  if (!author) delete queries.query.where;
  if (!title) delete queries.query.title;
  if (!tags) delete queries.query.tagList;

  return {
    where: { ...queries.query }
  };
};

export { slugGen, queryFilterer };
