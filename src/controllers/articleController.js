/* eslint-disable no-shadow */
/* eslint-disable max-len */
import { config } from 'dotenv';
import {
  User, Article, Reaction, Comment, Share, Statistic, Report, CommentHistory
} from '../sequelize/models';
import { slugGen, uploadImage, queryFilterer } from '../helpers/articles/articleHelper';
import readTime from '../helpers/articles/readTimeForArticle';
import ShareArticleHelper from '../helpers/articles/shareHelper';
import recordStats from '../helpers/articles/recordStats';
import ArticleRatelehelper from '../helpers/articles/rateArticleHelper';
import Paginator from '../helpers/articles/pagination';
import commentHistoryCreate from '../helpers/articles/commentHistory';

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
      const readTimeOfArticle = readTime(body, title, description);
      const payload = {
        title: title.trim(),
        description: description.trim(),
        body: body.trim()
      };
      if (req.body.tags) {
        payload.tagList = req.body.tags.toLowerCase().trim().split(/[ ,]+/);
      }
      if (req.body.category) {
        payload.category = req.body.category.trim();
      }
      payload.images = await uploadImage(req.files.image);
      payload.slug = slugGen(title);
      payload.authorId = id;
      const article = await Article.create(payload);
      const {
        slug, category, images, tagList, authorId
      } = article;
      if (article) {
        return res.status(201).json({
          article: {
            id: article.id,
            slug,
            title: article.title,
            description,
            body: article.body,
            category,
            images,
            tagList,
            readTime: readTimeOfArticle,
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
      return res.status(400).json({
        error: 'Please ensure Title or Description is not more than 255 characters'
      });
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
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const { title, author, tags } = req.query;
      const { where } = queryFilterer(title, author, tags);

      const {
        data, previous, next, pages, pageLimit, currentPage
      } = await Paginator(Article, {
        page,
        limit,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['userName', 'bio', 'image', 'firstName', 'lastName']
          }
        ],
        where
      });
      if (!data || !data.length) {
        return res.status(404).json({
          message: 'No articles found at the moment! please come back later'
        });
      }

      const previousURL = new URL(`?page=${previous}&limit=${pageLimit}`, `${process.env.APP_URL}/articles`);
      const nextURL = new URL(`?page=${next}&limit=${pageLimit}`, `${process.env.APP_URL}/articles`);
      const firstPage = new URL(`?page=1&limit=${pageLimit}`, `${process.env.APP_URL}/articles`);
      const lastPage = new URL(`?page=${pages}&limit=${pageLimit}`, `${process.env.APP_URL}/articles`);

      data.map((article) => {
        const readTimeOfArticle = readTime(article.body);
        article.get().readTime = readTimeOfArticle;
        article.readTime = readTime;
        return true;
      });
      res.status(200).json({
        firstPage,
        previousPage: previousURL,
        currentPage,
        nextPage: nextURL,
        lastPage,
        articles: data
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
      const originalArticle = await Article.findOne({ where: { slug: req.userData.slug, blocked: false } });
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
      const updatedArticle = await Article.update(article, {
        where: { slug: req.userData.slug, blocked: false },
        returning: true,
        plain: true
      });
      const readTimeOfArticle = readTime(updatedArticle[1].body);
      updatedArticle[1].get().readTime = readTimeOfArticle;
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
        where: { id: req.userData.articleId, blocked: false }
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

      const findArticle = await Article.findOne({ where: { slug: slugId, blocked: false } });

      if (!findArticle) {
        return res.status(404).json({
          message: 'Article not found'
        });
      }

      const reactedAlready = await Reaction.findOne({
        where: { articleSlug: slugId, userId: liker }
      });

      const { id } = findArticle;

      if (!reactedAlready) {
        const likedArticle = await Reaction.create({
          articleId: id,
          articleSlug: slugId,
          userId: liker,
          likes: likeVote
        });

        const { articleSlug, userId, likes } = likedArticle;

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
          const removeLike = await Reaction.update(
            { likes: dislikeVote },
            { where: { articleSlug: slugId, userId: liker } }
          );

          if (removeLike) {
            await Article.decrement({ likes: 1 }, { where: { slug: slugId } });
            const updatedArticle = await Reaction.findOne({
              where: { articleSlug: slugId, userId: liker }
            });

            const { articleSlug, userId, likes } = updatedArticle;

            return res.status(200).json({
              message: 'You have removed your like',
              reaction: {
                articleSlug,
                userId,
                likes
              }
            });
          }
        }
      } else {
        const { dislikes } = reactedAlready;

        if (dislikes > 0) {
          const removeDislike = await Reaction.update(
            { dislikes: dislikeVote },
            { where: { articleSlug: slugId, userId: liker } }
          );

          if (removeDislike) {
            await Article.decrement({ dislikes: 1 }, { where: { slug: slugId } });
            const likeArticleAgain = await Reaction.update(
              { likes: likeVote },
              { where: { articleSlug: slugId, userId: liker } }
            );

            if (likeArticleAgain) {
              await Article.increment({ likes: 1 }, { where: { slug: slugId } });
              const updatedArticle = await Reaction.findOne({
                where: { articleSlug: slugId, userId: liker }
              });

              const { articleSlug, userId, likes } = updatedArticle;

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
        } else {
          const likeArticleAgain = await Reaction.update(
            { likes: likeVote },
            { where: { articleSlug: slugId, userId: liker } }
          );
          await Article.increment({ likes: 1 }, { where: { slug: slugId } });

          if (likeArticleAgain) {
            const updatedArticle = await Reaction.findOne({
              where: { articleSlug: slugId, userId: liker }
            });

            const { articleSlug, userId, likes } = updatedArticle;

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
      }
    } catch (err) {
      throw err;
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

      const findArticle = await Article.findOne({ where: { slug: slugId, blocked: false } });

      if (!findArticle) {
        return res.status(404).json({
          message: 'Article not found'
        });
      }

      const reactedAlready = await Reaction.findOne({
        where: { articleSlug: slugId, userId: disliker }
      });

      const { id } = findArticle;

      if (!reactedAlready) {
        const dislikedArticle = await Reaction.create({
          articleId: id,
          articleSlug: slugId,
          userId: disliker,
          dislikes: likeVote
        });
        const { articleSlug, userId, dislikes } = dislikedArticle;

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
          const removeDislike = await Reaction.update(
            { dislikes: dislikeVote },
            { where: { articleSlug: slugId, userId: disliker } }
          );

          if (removeDislike) {
            const updatedArticle = await Reaction.findOne({
              where: { articleSlug: slugId, userId: disliker }
            });
            await Article.decrement({ dislikes: 1 }, { where: { slug: slugId } });

            const { articleSlug, userId, dislikes } = updatedArticle;

            return res.status(200).json({
              message: 'You have removed your dislike',
              reaction: {
                articleSlug,
                userId,
                dislikes
              }
            });
          }
        }
      } else {
        const { likes } = reactedAlready;

        if (likes > 0) {
          const removeLike = await Reaction.update(
            { likes: dislikeVote },
            { where: { articleSlug: slugId, userId: disliker } }
          );

          if (removeLike) {
            await Article.decrement({ likes: 1 }, { where: { slug: slugId } });
            const dislikeArticleAgain = await Reaction.update(
              { dislikes: likeVote },
              { where: { articleSlug: slugId, userId: disliker } }
            );

            if (dislikeArticleAgain) {
              await Article.increment({ dislikes: 1 }, { where: { slug: slugId } });
              const updatedArticle = await Reaction.findOne({
                where: { articleSlug: slugId, userId: disliker }
              });

              const { articleSlug, userId, dislikes } = updatedArticle;

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
        } else {
          const dislikeArticleAgain = await Reaction.update(
            { dislikes: likeVote },
            { where: { articleSlug: slugId, userId: disliker } }
          );

          if (dislikeArticleAgain) {
            await Article.increment({ dislikes: 1 }, { where: { slug: slugId } });
            const updatedArticle = await Reaction.findOne({
              where: { articleSlug: slugId, userId: disliker }
            });

            const { articleSlug, userId, dislikes } = updatedArticle;

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
      }
    } catch (err) {
      throw err;
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
        where: { slug: req.params.slug, blocked: false },
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
      const averageRatings = await ArticleRatelehelper.getRatings(article.id);
      article.get().averageRatings = averageRatings;

      const readTimeOfArticle = readTime(article.body);
      article.get().readTime = readTimeOfArticle;
      recordStats(article);
      return res.status(200).json({
        article
      });
    } catch (err) {
      throw err;
    }
  }

  /**
 * @param  {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} response
 *  @static
 */
  static async shareArticle(req, res) {
    const { option } = req.params;
    const { slug } = req.params;
    const { id } = req.userData;
    const article = await ShareArticleHelper.findArticleBySlug(req.params.slug);
    if (!article) { return res.status(404).json({ error: 'article not found' }); }
    const result = await ShareArticleHelper.shareArticle(req);
    if (result) {
      const createShare = await Share.create({
        userId: id,
        articleId: article.id,
        slug,
        platform: [option],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return res.status(201).json({ message: `Successfully shared the article on ${option}`, share: createShare });
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing a commented article response
   */
  static async commentArticle(req, res) {
    const commenter = req.userData.id;
    const slugId = req.params.articleSlug;
    const { comment } = req.body;

    const authorProfile = await User.findOne({ where: { id: commenter } });

    const findArticle = await Article.findOne({ where: { slug: slugId } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const { id } = findArticle;
    const { userName, image } = authorProfile;

    const articleComment = await Comment.create({
      articleId: id,
      articleSlug: slugId,
      userId: commenter,
      comment: comment.trim(),
    });

    return res.status(201).json({
      message: 'You have commented on the article',
      articleComment: {
        id: articleComment.id,
        articleSlug: articleComment.articleSlug,
        comment: articleComment.comment,
        likes: articleComment.likes,
        dislikes: articleComment.dislikes,
        updatedAt: articleComment.updatedAt,
        createdAt: articleComment.createdAt,
        commenter: {
          username: userName,
          image
        }
      }
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing an updated comment
   */
  static async updateComment(req, res) {
    const commenter = req.userData.id;
    const slugId = req.params.articleSlug;
    const specificComment = req.params.commentId;
    let { comment } = req.body;

    const findArticle = await Article.findOne({ where: { slug: slugId } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    comment = comment.trim();

    const findCommenter = await Comment.findOne({ where: { articleSlug: slugId, userId: commenter, id: specificComment } });

    if (!findCommenter) {
      return res.status(404).json({
        message: 'Comment cannot be found'
      });
    }

    await Comment.update({ comment }, { where: { id: specificComment } });
    const updatedComment = await Comment.findOne({ where: { id: specificComment } });
    await commentHistoryCreate(req, findCommenter);

    return res.status(200).json({
      message: 'Comment updated',
      updatedComment: {
        id: updatedComment.id,
        articleSlug: updatedComment.articleSlug,
        comment: updatedComment.comment,
        likes: updatedComment.likes,
        dislikes: updatedComment.dislikes,
        updatedAt: updatedComment.updatedAt,
        createdAt: updatedComment.createdAt,
      }
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing an article's comments
   */
  static async retrieveComments(req, res) {
    const slugId = req.params.articleSlug;

    const findArticle = await Article.findOne({ where: { slug: slugId } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const comments = await Comment.findAll({ where: { articleSlug: slugId } });

    if (!comments.length) {
      return res.status(404).json({
        message: 'The article has no comments at the moment'
      });
    }

    return res.status(200).json({
      message: 'Comments retrieved',
      comments
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing an article's comments
   */
  static async deleteComment(req, res) {
    const commenter = req.userData.id;
    const slugId = req.params.articleSlug;
    const specificComment = req.params.commentId;

    const findArticle = await Article.findOne({ where: { slug: slugId } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const removeComment = await Comment.destroy({ where: { articleSlug: slugId, userId: commenter, id: specificComment } });

    if (!removeComment) {
      return res.status(404).json({
        message: 'Comment cannot be found'
      });
    }

    return res.status(200).json({
      message: 'Comment deleted'
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing an article's statistics
   */
  static async readingStats(req, res) {
    const slugId = req.params.articleSlug;

    const findArticle = await Article.findOne({ where: { slug: slugId } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const statistics = await Statistic.findOne({ where: { articleSlug: slugId } });

    if (!statistics) {
      return res.status(404).json({
        message: 'The article has never been read so far'
      });
    }

    return res.status(200).json({
      message: 'Reading statistics retrieved',
      statistics
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing a blocked article response
   */
  static async blockArticle(req, res) {
    const slugId = req.params.articleSlug;

    const findArticle = await Report.findOne({ where: { slug: slugId } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found in the reported articles'
      });
    }

    const alreadyBlocked = await Article.findOne({ where: { slug: slugId, blocked: true } });

    if (alreadyBlocked) {
      return res.status(400).json({
        message: 'The article is already blocked'
      });
    }

    await Article.update({ blocked: true }, { where: { slug: slugId } });

    return res.status(200).json({
      message: 'Article blocked',
      blockedArticle: findArticle
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing a unblocked article response
   */
  static async unblockArticle(req, res) {
    const slugId = req.params.articleSlug;

    const findArticle = await Article.findOne({ where: { slug: slugId, blocked: true } });

    if (!findArticle) {
      return res.status(404).json({
        message: 'Article not found in the blocked articles'
      });
    }

    await Report.destroy({ where: { slug: slugId } });

    await Article.update({ blocked: false }, { where: { slug: slugId } });

    return res.status(200).json({
      message: 'Article unblocked',
    });
  }

  /**
   * @description - Users should be able to track edit history
   * @param {Object} req - Request Object
   * @param {Object} res  - Response Object
   * @returns {Object} - Response object
   */
  static async commentHistory(req, res) {
    const { commentId } = req.params;
    const findHistory = await CommentHistory.findAll({ where: { commentId }, order: [['updatedAt', 'DESC']] });
    const history = findHistory.length;
    if (!history) {
      return res.status(404).json({ message: 'No edit history for this comment!' });
    }
    return res.status(200).json({ message: 'Successfully comment edit history retrieved', data: { commentHistory: findHistory } });
  }
}

export default ArticleController;
