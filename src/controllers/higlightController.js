import { config } from 'dotenv';
import { Article, Highlight } from '../sequelize/models';

config();

/**
 * @description All the article highlights
 */
class Highlights {
  /**
     * @description highlight text iof an article
     * @param {object} req
     * @param {object} res
     * @returns {object} error or highlighted object
     */
  static async highlightText(req, res) {
    try {
      const payload = req.body;
      const articleSlug = req.params.slug;
      const userId = req.userData.id;

      const article = await Article.findOne({ where: { slug: articleSlug } });

      if (!article) {
        return res.status(404).json({
          error: `Article ${articleSlug} does not exist`
        });
      }

      const { body } = article;
      let highlightedText = 'highlighted';
      let { comment } = payload;
      const { startIndex, text } = payload;
      const textToHighlight = body.slice(startIndex);

      if (!textToHighlight.includes(text)) {
        return res.status(404).json({
          error: `Text ${text} not found in the article`
        });
      }

      if (!comment) {
        comment = null;
      }

      const existingHighlight = await Highlight.findOne({
        where: {
          articleId: article.id,
          userId,
          text,
          startIndex,
          comment
        }
      });

      let highlightComment = null;
      if (existingHighlight && existingHighlight.comment) {
        highlightComment = existingHighlight.comment.trim();
      }
      if (existingHighlight && (highlightComment === comment)
      && (+existingHighlight.startIndex === +startIndex)) {
        await Highlight.destroy({
          where: { id: existingHighlight.id }
        });

        return res.status(200).json({
          message: 'Highlight successfully deleted'
        });
      }

      const highlight = await Highlight.create({
        articleId: article.id,
        userId,
        startIndex,
        text,
        comment
      });

      if (comment) {
        highlightedText = 'commented on';
      }

      return res.status(201).json({
        message: `Text successfully ${highlightedText}`,
        highlight
      });
    } catch (err) {
      throw err;
    }
  }
}

export default Highlights;
