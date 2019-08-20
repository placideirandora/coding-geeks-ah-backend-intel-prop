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
    const userInfo = {
      username: rateAuthor.username,
      email: rateAuthor.email,
      bio: rateAuthor.bio,
      image: rateAuthor.image
    };
    const ratings = await Rating.findOne(
      { where: { reviewerId: rateAuthor.id, articleId: req.params.id } }
    );

    if (ratings) {
      const [, updatedRating] = await Rating.update(
        { rate }, { where: { id: ratings.id }, returning: true }
      );
      return res.status(200).send({
        status: res.statusCode,
        data: { rating: updatedRating, Author: userInfo }
      });
    }
    const rating = await Rating.create({
      rate,
      articleId: req.params.id,
      reviewerId: rateAuthor.id
    });

    return res.status(201).send({
      data: { rating, Author: userInfo }
    });
  }
}

export default ArticleRate;
