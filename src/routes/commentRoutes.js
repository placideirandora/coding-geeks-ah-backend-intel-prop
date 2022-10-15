import express from 'express';
import Validation from '../middleware/validation';
import verifyToken from '../middleware/verifyToken';
import findUser from '../middleware/findUser';
import CommentReaction from '../controllers/commentController';

const commentsRouter = express.Router();


commentsRouter.put('/:id/like', [verifyToken, findUser, Validation.idInParamsValidation], CommentReaction.likeComment);
commentsRouter.put('/:id/dislike', [verifyToken, findUser, Validation.idInParamsValidation], CommentReaction.dislikeComment);

export default commentsRouter;
