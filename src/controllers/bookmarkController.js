import { Bookmark, Article } from '../sequelize/models';

/**
 * @description holds bookmarks logic
 */
class BookmarkController {
  /**
   * @description create bookmarks
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with created bookmark
   */
  static async createBookmark(req, res) {
    try {
      const userId = req.userData.id;
      const articleSlug = req.params.slug;
      const article = await Article.findOne({ where: { slug: articleSlug } });
      if (!article) {
        return res.status(404).json({
          message: 'Sorry! The specified article could not be found. '
        });
      }
      const bookmark = await Bookmark.findOne({ where: { articleId: article.id, userId } });
      if (bookmark) {
        return res.status(409).json({
          message: 'Article already bookmarked'
        });
      }
      const articleId = article.id;
      await Bookmark.create({
        articleId,
        userId
      });
      return res.status(201).json({
        message: 'Bookmark added successfully'
      });
    } catch (err) {
      throw (err);
    }
  }

  /**
   * @description get all bookmarks
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with all bookmarks
   */
  static async getBookmarks(req, res) {
    try {
      const userId = req.userData.id;
      const bookmarks = await Bookmark.findAll({
        order: [['createdAt', 'DESC']],
        where: { userId },
        include: {
          model: Article,
          attributes: ['slug', 'title', 'description']
        }
      });
      if (!bookmarks.length) {
        return res.status(404).json({
          message: 'Sorry! No bookmarks found at the moment.'
        });
      }
      res.status(200).json({
        bookmarks
      });
    } catch (err) {
      throw (err);
    }
  }

  /**
   * @description delete a bookmark
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with message of either success or failure
   */
  static async deleteBookmark(req, res) {
    try {
      const userId = req.userData.id;
      const articleSlug = req.params.slug;
      const article = await Article.findOne({ where: { slug: articleSlug } });
      if (!article) {
        return res.status(404).json({
          message: 'Sorry! The specified article could not be found. '
        });
      }
      const bookmark = await Bookmark.findOne({ where: { articleId: article.id, userId } });
      if (!bookmark) {
        return res.status(404).json({
          message: 'Sorry! Bookmark not found.'
        });
      }
      await Bookmark.destroy({ where: { articleId: article.id, userId } });
      return res.status(200).json({
        message: 'Bookmark deleted successfully'
      });
    } catch (err) {
      throw (err);
    }
  }
}

export default BookmarkController;
