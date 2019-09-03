import { config } from 'dotenv';

config();

/**
 * @param {object} model
 * @param {object} options
 * @return {object} article ratings and pagination links
 */
const paginator = async (model, options) => {
  let { limit, page } = options;
  const { ...otherOptions } = options;
  if ((!page) || (Number.isNaN(page))) {
    page = 1;
  }
  if (!limit || (Number.isNaN(limit))) {
    limit = 10;
  }

  if (page < 1) {
    page = 1;
  }
  if (limit < 1 || limit > 10) {
    limit = 10;
  }
  const { count } = await model.findAndCountAll();

  if (!count) {
    return false;
  }
  const pages = Math.ceil(count / limit);
  if (page > pages) {
    page = pages;
  }

  const previous = page === 1 ? 1 : page - 1;
  const next = page === pages ? page : page + 1;

  const offset = (page - 1) * limit;
  const data = await model.findAll({ ...otherOptions, limit, offset });
  const currentPage = page;
  const pageLimit = limit;
  return {
    data, previous, next, pages, pageLimit, currentPage
  };
};

export default paginator;
