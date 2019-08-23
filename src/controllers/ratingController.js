import model from '../sequelize/models';

const { User, Rating } = model;

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
    const rateAuthor = await User.findOne({ where: { id: req.userData.id } });
    const ratings = await Rating.findOne(
      { where: { reviewerId: rateAuthor.id, articleId: req.params.id } }
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
      articleId: req.params.id,
      reviewerId: rateAuthor.id
    });

    return res.status(201).send({
      message: 'Successfully rated this article',
      data: { rating }
    });
  }
}

export default ArticleRate;
