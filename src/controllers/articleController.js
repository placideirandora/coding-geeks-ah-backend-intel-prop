/* eslint-disable no-shadow */
/* eslint-disable max-len */
import { User, Article, Reaction } from '../sequelize/models';
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
      const { title, description, body } = req.body;
      const payload = {
        title: title.trim(),
        description: description.trim(),
        body: body.trim()
      };
      if (req.body.tags || req.body.category) {
        payload.tagList = req.body.tags.trim().split(/[ ,]+/);
        payload.category = req.body.category.trim();
      }
      payload.images = await uploadImage(req.files.image);
      payload.slug = slugGen(title);
      payload.authorId = id;
      const article = await Article.create(payload);
      const {
        slug, category, images, tagList, authorId, likes, dislikes
      } = article;
      if (article) {
        return res.status(201).json({
          article: {
            slug,
            title: article.title,
            description: article.title,
            body: article.body,
            category,
            images,
            tagList,
            author: {
              authorId,
              username: author.userName,
              bio: author.bio,
              image: author.image,
              following: author.following
            },
            likes,
            dislikes,
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

  /**
   * @description like an article
   * @param {object} req
   * @param {object} res
   * @return {object} return object with a liked article
   */
  static async likeArticle(req, res) {
    try {
      const liker = req.userData.id;
      const slugId = req.params.articleSlug;
      const likeVote = 1;
      const dislikeVote = 0;

      const findArticle = await Article.findOne({ where: { slug: slugId } });

      if (!findArticle) {
        return res.status(200).json({
          message: 'Article not found'
        });
      }

      const reactedAlready = await Reaction.findOne({ where: { articleSlug: slugId, userId: liker } });

      if (!reactedAlready) {
        const likedArticle = await Reaction.create({
          articleSlug: slugId,
          userId: liker,
          likes: likeVote,
        });

        const {
          articleSlug, userId, likes
        } = likedArticle;

        if (likedArticle) {
          await Article.increment({ likes: 1 }, { where: { slug: slugId } });

          return res.status(200).json({
            message: 'You have liked the article',
            reaction: {
              ArticleSLUG: articleSlug,
              UserID: userId,
              Likes: likes
            }
          });
        }
      }

      const { likes } = reactedAlready;

      if (likes > 0) {
        if (reactedAlready) {
          const removeLike = await Reaction.update({ likes: dislikeVote }, { where: { articleSlug: slugId, userId: liker } });

          if (removeLike) {
            await Article.decrement({ likes: 1 }, { where: { slug: slugId } });
            const updatedArticle = await Reaction.findOne({ where: { articleSlug: slugId, userId: liker } });

            const {
              articleSlug, userId, likes,
            } = updatedArticle;

            return res.status(200).json({
              message: 'You have removed your like',
              reaction: {
                ArticleSLUG: articleSlug,
                UserID: userId,
                Likes: likes,
              }
            });
          }
        }
      } else {
        const { dislikes } = reactedAlready;

        if (dislikes > 0) {
          const removeDislike = await Reaction.update({ dislikes: dislikeVote }, { where: { articleSlug: slugId, userId: liker } });

          if (removeDislike) {
            await Article.decrement({ dislikes: 1 }, { where: { slug: slugId } });
            const likeArticleAgain = await Reaction.update({ likes: likeVote }, { where: { articleSlug: slugId, userId: liker } });

            if (likeArticleAgain) {
              await Article.increment({ likes: 1 }, { where: { slug: slugId } });
              const updatedArticle = await Reaction.findOne({ where: { articleSlug: slugId, userId: liker } });

              const {
                articleSlug, userId, likes,
              } = updatedArticle;

              return res.status(200).json({
                message: 'You have liked the article',
                reaction: {
                  ArticleSLUG: articleSlug,
                  UserID: userId,
                  Likes: likes,
                }
              });
            }
          }
        } else {
          const likeArticleAgain = await Reaction.update({ likes: likeVote }, { where: { articleSlug: slugId, userId: liker } });
          await Article.increment({ likes: 1 }, { where: { slug: slugId } });

          if (likeArticleAgain) {
            const updatedArticle = await Reaction.findOne({ where: { articleSlug: slugId, userId: liker } });

            const {
              articleSlug, userId, likes,
            } = updatedArticle;

            return res.status(200).json({
              message: 'You have liked the article',
              reaction: {
                ArticleSLUG: articleSlug,
                UserID: userId,
                Likes: likes,
              }
            });
          }
        }
      }
    } catch (err) {
      throw (err);
    }
  }

  /**
   * @description dislike an article
   * @param {object} req
   * @param {object} res
   * @return {object} return object with a disliked article
   */
  static async dislikeArticle(req, res) {
    try {
      const disliker = req.userData.id;
      const slugId = req.params.articleSlug;
      const likeVote = 1;
      const dislikeVote = 0;

      const findArticle = await Article.findOne({ where: { slug: slugId } });

      if (!findArticle) {
        return res.status(200).json({
          message: 'Article not found'
        });
      }

      const reactedAlready = await Reaction.findOne({ where: { articleSlug: slugId, userId: disliker } });

      if (!reactedAlready) {
        const dislikedArticle = await Reaction.create({
          articleSlug: slugId,
          userId: disliker,
          dislikes: likeVote,
        });
        const {
          articleSlug, userId, dislikes
        } = dislikedArticle;

        if (dislikedArticle) {
          await Article.increment({ dislikes: 1 }, { where: { slug: slugId } });

          return res.status(200).json({
            message: 'You have disliked the article',
            reaction: {
              ArticleSLUG: articleSlug,
              UserID: userId,
              Dislikes: dislikes
            }
          });
        }
      }

      const { dislikes } = reactedAlready;

      if (dislikes > 0) {
        if (reactedAlready) {
          const removeDislike = await Reaction.update({ dislikes: dislikeVote }, { where: { articleSlug: slugId, userId: disliker } });

          if (removeDislike) {
            const updatedArticle = await Reaction.findOne({ where: { articleSlug: slugId, userId: disliker } });
            await Article.decrement({ dislikes: 1 }, { where: { slug: slugId } });

            const {
              articleSlug, userId, dislikes,
            } = updatedArticle;

            return res.status(200).json({
              message: 'You have removed your dislike',
              reaction: {
                ArticleSLUG: articleSlug,
                UserID: userId,
                Dislikes: dislikes,
              }
            });
          }
        }
      } else {
        const { likes } = reactedAlready;

        if (likes > 0) {
          const removeLike = await Reaction.update({ likes: dislikeVote }, { where: { articleSlug: slugId, userId: disliker } });

          if (removeLike) {
            await Article.decrement({ likes: 1 }, { where: { slug: slugId } });
            const dislikeArticleAgain = await Reaction.update({ dislikes: likeVote }, { where: { articleSlug: slugId, userId: disliker } });

            if (dislikeArticleAgain) {
              await Article.increment({ dislikes: 1 }, { where: { slug: slugId } });
              const updatedArticle = await Reaction.findOne({ where: { articleSlug: slugId, userId: disliker } });

              const {
                articleSlug, userId, dislikes,
              } = updatedArticle;

              return res.status(200).json({
                message: 'You have disliked the article',
                reaction: {
                  ArticleSLUG: articleSlug,
                  UserID: userId,
                  Dislikes: dislikes,
                }
              });
            }
          }
        } else {
          const dislikeArticleAgain = await Reaction.update({ dislikes: likeVote }, { where: { articleSlug: slugId, userId: disliker } });

          if (dislikeArticleAgain) {
            await Article.increment({ dislikes: 1 }, { where: { slug: slugId } });
            const updatedArticle = await Reaction.findOne({ where: { articleSlug: slugId, userId: disliker } });

            const {
              articleSlug, userId, dislikes,
            } = updatedArticle;

            return res.status(200).json({
              message: 'You have disliked the article',
              reaction: {
                ArticleSLUG: articleSlug,
                UserID: userId,
                Dislikes: dislikes,
              }
            });
          }
        }
      }
    } catch (err) {
      throw (err);
    }
  }
}


export default ArticleController;
