import db from '../../sequelize/models';

const { Article, Rating } = db;

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
    const findArticle = await Article.findOne({ where: { id } });
    if (findArticle) {
      const articleOwner = await Article.findAll({
        where: { id, authorId: user }
      });
      if (articleOwner.length) {
        return 'Sorry! You cannot rate your article';
      }
    }
    if (findArticle == null) {
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

  /**
     * Check the environment
     * @function getRatings
     * @param  {integer} article - Check the articleId
     * @return {string} Validate the rate
     */
  static async getRatings(article) {
    const ratings = await Rating.findAll({ where: { articleId: article } });

    let sum = 0;
    ratings.forEach((rate) => {
      sum += rate.get().rate;
      return sum;
    });
    const average = sum / (ratings.length);
    return average;
  }
}

export default ArticleRatelehelper;
