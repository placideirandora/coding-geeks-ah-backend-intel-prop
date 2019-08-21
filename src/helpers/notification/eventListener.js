import eventEmitter from './eventEmitter';
import newArticleNotification from './newArticleNotification';

eventEmitter.on('newArticle', newArticleNotification);
