import { Statistic } from '../../sequelize/models';

const recordStatistics = async (article) => {
  const { id, slug, authorId } = article;

  const oldArticle = await Statistic.findOne({ where: { articleId: id } });

  if (!oldArticle) {
    await Statistic.create({
      articleId: id,
      articleSlug: slug,
      authorId,
      reads: 1
    });
  } else {
    await Statistic.increment({ reads: 1 }, { where: { articleId: id } });
  }
};

export default recordStatistics;
