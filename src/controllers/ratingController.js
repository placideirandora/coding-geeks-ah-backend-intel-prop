import model from '../sequelize/models';
import Paginator from '../helpers/articles/pagination';

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
     * @description get article rating
     * @param  {object} req - accept object with user info
     * @param  {object} res - accept object with user info
     * @return {json} Returns json object
     */
  static async getArticleRating(req, res) {
    const { articleId } = req.params;
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const {
      data, previous, next, pages, pageLimit, currentPage
    } = await Paginator(Rating, {
      where: { articleId },
      page,
      limit
    });
    if (!data) {
      return res.status(200).json({ message: 'This article has no ratings so far' });
    }
    const previousURL = new URL(`?page=${previous}&limit=${pageLimit}`, `${process.env.APP_URL}/articles/${articleId}/rate`);
    const nextURL = new URL(`?page=${next}&limit=${pageLimit}`, `${process.env.APP_URL}/articles/${articleId}/rate`);
    const firstPage = new URL(`?page=1&limit=${pageLimit}`, `${process.env.APP_URL}/articles/${articleId}/rate`);
    const lastPage = new URL(`?page=${pages}&limit=${pageLimit}`, `${process.env.APP_URL}/articles/${articleId}/rate`);
    return res.status(200).json({
      firstPage,
      previousPage: previousURL,
      currentPage,
      nextPage: nextURL,
      lastPage,
      message: 'Successfully ratings retrieved',
      ratings: data
    });
  }
}

export default ArticleRate;
