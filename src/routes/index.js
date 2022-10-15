import express from 'express';
import usersRouter from './userRoutes';
import articlesRouter from './articleRoutes';
import profilesRouter from './profileRoutes';
import socialRouter from './socialRoutes';
import bookmarksRouter from './bookmarkRoutes';
import commentsRouter from './commentRoutes';

const router = express();

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('/profiles', profilesRouter);
router.use('/auth', socialRouter);
router.use('/comments', commentsRouter);
router.use('/bookmarks', bookmarksRouter);

export default router;
