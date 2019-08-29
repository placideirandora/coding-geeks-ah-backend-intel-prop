import { CommentReaction, Comment } from '../sequelize/models';

/**
 * @description holds article logic
 */
class CommentController {
  /**
   * @description like a specific comment
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with message of either success or failure
   */
  static async likeComment(req, res) {
    try {
      const userId = req.userData.id;
      const commentId = req.params.id;
      const comment = await Comment.findOne({ where: { id: commentId } });
      if (!comment) {
        return res.status(404).json({
          message: 'Sorry! Comment not found.'
        });
      }
      const reacted = await CommentReaction.findOne({ where: { userId, commentId } });
      if ((reacted) && (reacted.likes === 1)) {
        await CommentReaction.update({ likes: 0 }, { where: { userId, commentId } });
        await Comment.decrement({ likes: 1 }, { where: { id: commentId } });
        return res.status(200).json({
          message: 'You have successfully removed your like for this comment.'
        });
      }
      if ((reacted) && ((reacted.likes === 0) && (reacted.dislikes === 0))) {
        await CommentReaction.update({ likes: 1, dislikes: 0 }, { where: { userId, commentId } });
        await Comment.increment({ likes: 1 }, { where: { id: commentId } });
        return res.status(200).json({
          message: 'You have successfully liked this comment.'
        });
      }
      if ((reacted) && ((reacted.likes === 0) && (reacted.dislikes === 1))) {
        await CommentReaction.update({ likes: 1, dislikes: 0 }, { where: { userId, commentId } });
        await Comment.increment({ likes: 1, dislikes: -1 }, { where: { id: commentId } });
        return res.status(200).json({
          message: 'You have successfully liked this comment.'
        });
      }
      await CommentReaction.create({
        commentId,
        userId,
        likes: 1
      });
      await Comment.increment({ likes: 1 }, { where: { id: commentId } });
      return res.status(201).json({
        message: 'You have successfully liked this comment.'
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description dislike a specific comment
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with message of either success or failure
   */
  static async dislikeComment(req, res) {
    try {
      const userId = req.userData.id;
      const commentId = req.params.id;

      const comment = await Comment.findOne({ where: { id: commentId } });
      if (!comment) {
        return res.status(404).json({
          message: 'Sorry! Comment not found.'
        });
      }
      const reacted = await CommentReaction.findOne({ where: { userId, commentId } });
      if ((reacted) && ((reacted.dislikes === 1))) {
        await CommentReaction.update({ dislikes: 0 }, { where: { userId, commentId } });
        await Comment.decrement({ dislikes: 1 }, { where: { id: commentId } });
        return res.status(200).json({
          message: 'You have successfully removed your dislike for this comment.'
        });
      }
      if ((reacted) && ((reacted.likes === 0) && (reacted.dislikes === 0))) {
        await CommentReaction.update({ likes: 0, dislikes: 1 }, { where: { userId, commentId } });
        await Comment.increment({ dislikes: 1 }, { where: { id: commentId } });
        return res.status(200).json({
          message: 'You have successfully disliked this comment.'
        });
      }
      if ((reacted) && ((reacted.likes === 1) && (reacted.dislikes === 0))) {
        await CommentReaction.update({ likes: 0, dislikes: 1 }, { where: { userId, commentId } });
        await Comment.increment({ dislikes: 1, likes: -1 }, { where: { id: commentId } });
        return res.status(200).json({
          message: 'You have successfully disliked this comment.'
        });
      }
      await CommentReaction.create({
        commentId,
        userId,
        dislikes: 1
      });
      await Comment.increment({ dislikes: 1 }, { where: { id: commentId } });
      return res.status(201).json({
        message: 'You have successfully disliked this comment.'
      });
    } catch (err) {
      throw err;
    }
  }
}

export default CommentController;
