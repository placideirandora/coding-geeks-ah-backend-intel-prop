import { User, Report, Article } from '../sequelize/models';

/**
 * @description user should be able to report an article
 */
class reportArticleController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg data of saved report
   */
  static async createReport(req, res) {
    const userId = req.userData.id;
    const { articleSlug } = req.params;
    const { reason, description } = req.body;

    const authorProfile = await User.findOne({ where: { id: userId } });
    const findArticle = await Article.findOne({ where: { slug: articleSlug } });
    const findReported = await Report.findOne({ where: { slug: articleSlug } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }
    if (findArticle.authorId === userId) {
      return res.status(403).json({
        message: 'Sorry! You cannot report your own article'
      });
    }
    if (findReported && findReported.slug === articleSlug && findReported.reporterId === userId) {
      return res.status(409).json({
        message: 'Sorry! You already reported this article'
      });
    }
    const payload = {
      reporterId: userId,
      articleId: findArticle.id,
      slug: articleSlug,
      reason: reason.trim(),
      description: description.trim()
    };
    const { userName, image } = authorProfile;

    const newReported = await Report.create(payload);

    return res.status(201).json({
      report: {
        id: newReported.id,
        slug: newReported.slug,
        reason: newReported.reason,
        description: newReported.description,
        updatedAt: newReported.updatedAt,
        createdAt: newReported.createdAt,
        reporter: {
          username: userName,
          image
        }
      }
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg data of all report
   */
  static async getAllReport(req, res) {
    const reports = await Report.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'reporter',
          attributes: ['userName', 'image']
        }
      ]
    });

    if (!reports.length) {
      return res.status(404).json({
        message: 'No article reported at the moment'
      });
    }
    res.status(200).json({
      reports
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg data of report of specific slug
   */
  static async getSingleReport(req, res) {
    const { articleSlug } = req.params;

    const findArticle = await Article.findOne({ where: { slug: articleSlug } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const reports = await Report.findAll({
      order: [['createdAt', 'DESC']],
      where: { slug: articleSlug },
      include: [
        {
          model: User,
          as: 'reporter',
          attributes: ['userName', 'image']
        }
      ]
    });

    if (!reports.length) {
      return res.status(404).json({
        message: 'This article has never been reported at the moment'
      });
    }
    res.status(200).json({
      reports
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing an article's comments
   */
  static async deleteReport(req, res) {
    const reporter = req.userData.id;
    const { articleSlug } = req.params;
    const { reportId } = req.params;

    const findArticle = await Article.findOne({ where: { slug: articleSlug } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const removeReport = await Report.destroy({
      where: {
        slug: articleSlug, reporterId: reporter, id: reportId
      }
    });

    if (!removeReport) {
      return res.status(404).json({
        message: 'Report cannot be found'
      });
    }

    return res.status(200).json({
      message: 'Report deleted Successfully'
    });
  }
}

export default reportArticleController;
