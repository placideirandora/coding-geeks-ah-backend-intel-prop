import open from 'open';
import db from '../../sequelize/models';

const { Article } = db;

/**
 * @exports ShareArticleHelper
 * @class Articlehelper
 * @description Helps to generate token and password hashing
 * */
class ShareArticleHelper {
/**
  /**
   * @function findArticleBySlug
   * @param {number} slug - Response object
   * @return {object} Returns json object of an article
   * @static
   */
  static async findArticleBySlug(slug) {
    const article = await Article.findOne({ where: { slug }, logging: false });
    return article;
  }

  /**
  * @param  {object} req - request
  * @returns {object} response
  *  @static
  */
  static async shareArticle(req) {
    const { option } = req.params;
    const { slug } = req.params;
    const { SHARE_URL } = process.env;
    const articleShareUrl = `${SHARE_URL}${slug}`;
    if (option === 'facebook') {
      const result = await open(`http://www.facebook.com/sharer/sharer.php?u=${articleShareUrl}`);
      return result;
    } if (option === 'twitter') {
      const result = await open(`https://twitter.com/intent/tweet?text=${articleShareUrl}`);
      return result;
    } if (option === 'gmail') {
      const result = await open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Authorshaven%20Post&body=copy%20the%20following%20link%20to%20open%20the%20article%20${articleShareUrl}`);
      return result;
    }
  }
}

export default ShareArticleHelper;
