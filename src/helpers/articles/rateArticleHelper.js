import db from '../../sequelize/models';

const { Article } = db;

/**
 * @exports ArticRatelehelper
 * @class Articlehelper
 * @description Helps to generate token and passwor hashing
 * */
class ArticleRatelehelper {
  /**
       * Check the environment
       * @function validateArticleRated
       * @param  {integer} id - Check the rate
       * @param  {integer} user - Check the user
       * @return {string} Validate the rate
       */
  static async validateArticleRated(id, user) {
    const findarticle = await Article.findOne({ where: { id } });
    if (findarticle) {
      const articleOwner = await Article.findAll({
        where: { id, authorId: user }
      });
      if (articleOwner.length) {
        return 'Sorry! You cannot rate your article';
      }
    }
    if (findarticle == null) {
      return 'This Article does not exist';
    }
    return true;
  }

  /**
     * Check the environment
     * @function validateRating
     * @param  {integer} rate - Check the rate
     * @return {string} Validate the rate
     */
  static validateRating(rate) {
    const regRaterange = /^[1-5]{1}?$/;
    if (!regRaterange.test(rate)) {
      return 'Rate must be between 1 and 5';
    }
    return true;
  }
}

export default ArticleRatelehelper;
