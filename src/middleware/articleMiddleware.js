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
      req.params.id, req.userData.id
    );
    if (validateArticle !== true) {
      errorMessage.push(validateArticle);
    }
    if (req.body.rate === undefined) {
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
}
export default ArticleMiddleware;
