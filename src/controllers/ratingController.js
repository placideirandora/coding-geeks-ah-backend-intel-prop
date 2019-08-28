import model from '../sequelize/models';

const { User, Rating, Article } = model;

/**
 * @description Rate the article
 */
class ArticleRate {
  /**
     * @description rate article
     * @param {object} req
     * @param {object} res
     * @returns {object} returns object containing article rates
     */
  static async rateArticle(req, res) {
    const { rate } = req.body;
    const { articleId } = req.params;
    const rateAuthor = await User.findOne({ where: { id: req.userData.id } });
    const ratings = await Rating.findOne(
      { where: { reviewerId: rateAuthor.id, articleId } }
    );

    if (ratings) {
      const [, updatedRating] = await Rating.update(
        { rate }, { where: { id: ratings.id }, returning: true }
      );
      return res.status(200).send({
        message: 'Successfully updated the rate of this article',
        data: { rating: updatedRating }
      });
    }
    const rating = await Rating.create({
      rate,
      articleId: req.params.articleId,
      reviewerId: rateAuthor.id
    });

    return res.status(201).send({
      message: 'Successfully rated this article',
      data: { rating }
    });
  }

  /**
     * Check the environment
     * @function getArticleRating
     * @param  {object} req - accept object with user info
     * @param  {object} res - accept object with user info
     * @return {json} Returns json object
     * @static
     */
  static async getArticleRating(req, res) {
    const { articleId } = req.params;
    const getArticle = await Article.findOne({
      where: { id: articleId }
    });
    if (!getArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    const getRate = await Rating.findAll({
      where: { articleId },
    });
    if (!getRate.length) {
      return res.status(200).json({ message: 'This article has no rates so far' });
    }
    return res.status(200).json({ message: 'Successfully rates retrieved', rates: getRate });
  }
}

export default ArticleRate;
