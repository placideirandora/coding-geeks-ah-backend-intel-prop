import { Article } from '../sequelize/models';

const isOwner = async (req, res, next) => {
  const { slug, articleId } = req.params;
  const userId = req.userData.id;
  const { role } = req.userData;

  let foundArticle;
  if (slug) {
    foundArticle = await Article.findOne({ where: { slug } });
  } else {
    foundArticle = await Article.findOne({ where: { id: articleId } });
  }
  if (!foundArticle) {
    return res.status(404).json({
      error: 'Sorry! The specified article does not exist'
    });
  }
  const isAuthor = foundArticle.authorId === userId;
  if ((!isAuthor) && (role !== ('admin' || 'super-admin'))) {
    return res.status(403).json({
      error: 'Sorry! You are not allowed to view or make changes to this resource'
    });
  }
  req.userData.slug = slug;
  req.userData.articleId = foundArticle.id;
  next();
};

export default isOwner;
