import { User, Article } from '../sequelize/models';
import { slugGen, uploadImage } from '../helpers/articles/articleHelper';

/**
 * @description holds article logic
 */
class ArticleController {
  /**
   * @description create article
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with created article
   */
  static async createArticle(req, res) {
    try {
      const { id } = req.userData;
      const author = await User.findOne({ where: { id } });
      if (!author) {
        return res.status(403).json({
          error: 'Provided token is not registered to you'
        });
      }
      const { title } = req.body;
      const payload = req.body;
      if (req.body.tags) {
        payload.tagList = req.body.tags.split(/[ ,]+/);
      }
      payload.images = await uploadImage(req.files.image);
      payload.slug = slugGen(title);
      payload.authorId = id;
      const article = await Article.create(payload);
      const {
        slug,
        description,
        body,
        category,
        images,
        tagList,
        authorId
      } = article;
      if (article) {
        return res.status(201).json({
          article: {
            slug,
            title,
            description,
            body,
            category,
            images,
            tagList,
            author: {
              authorId,
              username: author.userName,
              bio: author.bio,
              image: author.image,
              following: author.following
            }
          }
        });
      }
    } catch (err) {
      throw (err);
    }
  }

  /**
   * @description get all articles
   * @param {object} req
   * @param {object} res
   * @return {object} return object with all articles
   */
  static async getAllArticles(req, res) {
    try {
      const articles = await Article.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['userName', 'bio', 'image']
          }
        ]
      });
      if (!articles.length) {
        return res.status(200).json({
          message: 'No articles found at the moment! please come back later'
        });
      }
      res.status(200).json({
        articles
      });
    } catch (err) {
      throw (err);
    }
  }
}

export default ArticleController;
