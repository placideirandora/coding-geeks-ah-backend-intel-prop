import ArticleRateHelper from '../helpers/articles/rateArticleHelper';

/**
 * @exports ArticleMiddleware
 * @class ArticleMiddleware
 * @description Article Middleware
 * */
class ArticleMiddleware {
  /**
     * Validate article and rate
     * @param {string} req - a request
     * @param {string} res - a response
     * @param {string} next - next function for passing to the next function
     * @return {string} Returns error or proceed the execution
     * @static
     */
  static async checkRatedArticle(req, res, next) {
    const errorMessage = [];
    const validateArticle = await ArticleRateHelper.validateArticleRated(
      req.params.articleId, req.userData.id
    );
    if (validateArticle !== true) {
      errorMessage.push(validateArticle);
    }
    if (!req.body.rate) {
      errorMessage.push('Rate is required');
    }
    const validateRate = await ArticleRateHelper.validateRating(req.body.rate);
    if (validateRate !== true) {
      errorMessage.push(validateRate);
    }
    if (errorMessage.length) {
      return res.status(400).json({ error: errorMessage[0] });
    }
    next();
  }

  /**
 * function for checking if a platform  is valid
 * @function isShared
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns { string } appropriate message
 */
  static async validPlatform(req, res, next) {
    const { option } = req.params;
    const platforms = ['facebook', 'twitter', 'gmail'];
    if (platforms.includes(option)) {
      next();
      return true;
    }
    return res.status(400).json({ error: 'invalid platform in path' });
  }

  /**
 * @description checks if query params provided are valid
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns { object } error if query is invalid
 */
  static validQueries(req, res, next) {
    const validParams = ['page', 'limit', 'author', 'title', 'tags'];
    if (req.query && Object.keys(req.query).filter(e => !validParams.includes(e)).length) {
      return res.status(400).json({
        error:
          'invalid query parameter. Only allowed page, limit, author, title and tags'
      });
    }
    next();
  }
}
export default ArticleMiddleware;
