/* eslint-disable no-shadow */
/* eslint-disable max-len */
import { config } from 'dotenv';
import { User, Article, Reaction } from '../sequelize/models';
import { slugGen, uploadImage } from '../helpers/articles/articleHelper';

config();
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
      if (req.body.tags) {
        payload.tagList = req.body.tags.trim().split(/[ ,]+/);
      }
      if (req.body.category) {
        payload.category = req.body.category.trim();
      }
      payload.images = await uploadImage(req.files.image);
      payload.slug = slugGen(title);
      payload.authorId = id;
      const article = await Article.create(payload);
      const {
        slug, category, images, tagList, authorId,
      } = article;
      if (article) {
        return res.status(201).json({
          article: {
            id: article.id,
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
            }
          }
        });
      }
    } catch (err) {
      throw err;
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
      let page = parseInt(req.query.page, 10);
      let limit = parseInt(req.query.limit, 10);
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 10;
      }
      if (page < 1) {
        page = 1;
      }
      if (limit < 1 || limit > 10) {
        limit = 10;
      }

      const { count } = await Article.findAndCountAll();
      if (!count) {
        return res.status(404).json({
          message: 'No articles found at the moment! please come back later'
        });
      }
      const pages = Math.ceil(count / limit);
      if (page > pages) {
        page = pages;
      }
      const previous = page === 1 ? 1 : page - 1;
      const next = page === pages ? page : page + 1;

      const offset = (page - 1) * limit;
      const articles = await Article.findAll({
        offset,
        limit,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['userName', 'bio', 'image']
          }
        ]
      });
      const previousURL = new URL(`?page=${previous}&limit=${limit}`, process.env.ARTICLE_URL);
      const nextURL = new URL(`?page=${next}&limit=${limit}`, process.env.ARTICLE_URL);
      const firstPage = new URL(`?page=1&limit=${limit}`, process.env.ARTICLE_URL);
      const lastPage = new URL(`?page=${pages}&limit=${limit}`, process.env.ARTICLE_URL);
      res.status(200).json({
        firstPage,
        previousPage: previousURL,
        currentPage: page,
        nextPage: nextURL,
        lastPage,
        articles
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description update article
   * @param {object} req
   * @param {object} res
   * @return {object} return object with updated article.
   */
  static async updateArticle(req, res) {
    try {
      const article = {};
      const {
        title, description, body, tags, category
      } = req.body;
      const originalArticle = await Article.findOne({ where: { slug: req.userData.slug } });
      if (title) {
        article.title = title.trim();
        article.slug = slugGen(title.trim());
      }
      article.description = description ? description.trim() : originalArticle.description;
      article.body = body ? body.trim() : originalArticle.body;
      article.tagList = tags ? tags.trim().split(/[ ,]+/) : originalArticle.tags;
      article.category = category ? category.trim() : originalArticle.category;
      if (req.files.image) {
        article.images = await uploadImage(req.files.image);
      }
      const updatedArticle = await Article.update(
        article,
        { where: { slug: req.userData.slug }, returning: true, plain: true }
      );
      if (updatedArticle) {
        return res.status(200).json({
          message: 'Article updated successfully',
          article: updatedArticle[1]
        });
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description delete article
   * @param {object} req
   * @param {object} res
   * @return {object} return message of success or error.
   */
  static async deteleArticle(req, res) {
    try {
      const deleted = await Article.destroy({
        where: { id: req.userData.articleId }
      });
      if (deleted) {
        return res.status(200).json({
          message: 'Article successful deleted!'
        });
      }
    } catch (err) {
      throw err;
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
        return res.status(404).json({
          message: 'Article not found'
        });
      }

      const reactedAlready = await Reaction.findOne({ where: { articleSlug: slugId, userId: liker } });

      const { id } = findArticle;

      if (!reactedAlready) {
        const likedArticle = await Reaction.create({
          articleId: id,
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
              articleSlug,
              userId,
              likes
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
                articleSlug,
                userId,
                likes,
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
                  articleSlug,
                  userId,
                  likes,
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
                articleSlug,
                userId,
                likes,
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
        return res.status(404).json({
          message: 'Article not found'
        });
      }

      const reactedAlready = await Reaction.findOne({ where: { articleSlug: slugId, userId: disliker } });

      const { id } = findArticle;

      if (!reactedAlready) {
        const dislikedArticle = await Reaction.create({
          articleId: id,
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
              articleSlug,
              userId,
              dislikes
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
                articleSlug,
                userId,
                dislikes,
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
                  articleSlug,
                  userId,
                  dislikes,
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
                articleSlug,
                userId,
                dislikes,
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
  * @description get an article
  * @param {object} req
  * @param {object} res
  * @return {object} return object with a disliked article
  */
  static async getSingleArticle(req, res) {
    try {
      const article = await Article.findOne({
        where: { slug: req.params.slug },
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['userName', 'bio', 'image']
          }
        ]
      });
      if (!article) {
        return res.status(404).json({
          message: 'Sorry! The requested article was not found.'
        });
      }
      return res.status(200).json({
        article
      });
    } catch (err) {
      throw (err);
    }
  }
}


export default ArticleController;
