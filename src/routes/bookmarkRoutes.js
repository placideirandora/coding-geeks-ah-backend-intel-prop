import express from 'express';
import Bookmark from '../controllers/bookmarkController';
import verifyToken from '../middleware/verifyToken';
import findUser from '../middleware/findUser';

const bookmarksRouter = express.Router();

bookmarksRouter.post('/:slug', [verifyToken, findUser], Bookmark.createBookmark);
bookmarksRouter.get('/', [verifyToken, findUser], Bookmark.getBookmarks);
bookmarksRouter.delete('/:slug', [verifyToken, findUser], Bookmark.deleteBookmark);

export default bookmarksRouter;
