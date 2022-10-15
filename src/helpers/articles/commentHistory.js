import db from '../../sequelize/models';

const { CommentHistory } = db;

const commentHistoryCreate = async (req, findCommenter) => {
  CommentHistory.create({
    userId: req.userData.id,
    articleSlug: findCommenter.articleSlug,
    editedComment: findCommenter.dataValues.comment,
    currentComment: req.body.comment,
    commentId: findCommenter.dataValues.id
  });
  return commentHistoryCreate;
};

export default commentHistoryCreate;
