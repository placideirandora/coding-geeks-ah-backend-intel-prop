import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import chai from 'chai';
import app from '../index';
import dummy from './dummyData';
import { Follow } from '../sequelize/models';
import { genToken } from '../helpers/auth';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const { dummyArticle, dummyUser } = dummy;
let articleId;
const invalidToken = genToken(dummyArticle.invalidUserToken);
// Start of Tests
before(async () => {
  await Follow.create(dummyUser.validFollower);
});

let userToken1;
let userToken2;
let userToken3;
let userToken4;
let articleSlug;
let articleSlug2;
let newArticleSlug;
let slugMe;
let commentId;
let toRate;
const invalidArticleSlug = 'something-new-w2zjzvm6o5sgad456';

before(async () => {
  await Follow.create(dummyUser.validFollower);
});

before((done) => {
  chai
    .request(app)
    .post('/api/v1/users/login')
    .send({
      email: 'eric.malaba@gmail.com',
      password: 'Superadmin12'
    })
    .end((err, res) => {
      if (err) done(err);
      userToken1 = res.body.data.token;
      done();
    });
});
before((done) => {
  chai
    .request(app)
    .post('/api/v1/users/login')
    .send({
      email: 'carlos@gmail.com',
      password: 'User1234'
    })
    .end((err, res) => {
      if (err) done(err);
      userToken2 = res.body.data.token;
      done();
    });
});
before((done) => {
  chai
    .request(app)
    .post('/api/v1/users/login')
    .send({
      email: 'cyuba@gmail.com',
      password: 'cr7-f00t!b0L'
    })
    .end((err, res) => {
      if (err) done(err);
      userToken3 = res.body.data.token;
      done();
    });
});
before((done) => {
  chai
    .request(app)
    .post('/api/v1/users/login')
    .send({
      email: 'kate@gmail.com',
      password: 'gotoBora-j00p!b0L'
    })
    .end((err, res) => {
      if (err) done(err);
      userToken4 = res.body.data.token;
      done();
    });
});

describe('POST AND GET /api/v1/articles', () => {
  it('Should receive a message if no articles found', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'No articles found at the moment! please come back later'
        );
        done();
      });
  });
});
describe('POST AND GET /api/v1/articles', () => {
  it('Should return error if provided token is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', invalidToken)
      .send(dummyArticle.validArticle)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(403);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Provided token is not registered to you');
        done();
      });
  });

  it('Should return error if title is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send('title', '')
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('title is not allowed to be empty');
        done();
      });
  });
  it('Should return error if title is less than 10 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.incompleteTitle)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Title must have atleast 10 characters');
        done();
      });
  });
  it('Should return error if description  is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.missingDescription)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Description is required');
        done();
      });
  });
  it('Should return error if description  is less than 10 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.incompleteDescription)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Description must have at least 10 characters');
        done();
      });
  });
  it('Should return error if body  is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.missingBody)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Body is required');
        done();
      });
  });
  it('Should return error if category is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken2)
      .send(dummyArticle.lessCategory)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res.body).to.have.keys('article');
        done();
      });
  });
  it('Should return error if category is not a string', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.incorrectCategory)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('category must be a string');
        done();
      });
  });
  it('Should return error if taglist is not a string', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.incorrectTagList)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('tags must be a string');
        done();
      });
  });
  it('Should return error if taglist is not set', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken2)
      .send(dummyArticle.lessTags)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res.body).to.have.key('article');
        done();
      });
  });
  it('Should create and return an article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.validArticle)
      .end((err, res) => {
        articleSlug = res.body.article.slug;
        if (err) done(err);
        expect(res).have.status(201);
        expect(res.body.article).to.have.property('images');
        expect(res.body).to.have.key('article');
        articleSlug = res.body.article.slug;
        articleId = res.body.article.id;
        done();
      });
  });
  it('Should create and return a second article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.validArticle)
      .end((err, res) => {
        articleSlug = res.body.article.slug;
        if (err) done(err);
        expect(res).have.status(201);
        expect(res.body.article)
          .to.have.property('images');
        expect(res.body).to.have.key('article');
        articleSlug2 = res.body.article.slug;
        articleId = res.body.article.id;
        done();
      });
  });
  it('Should comment on the article', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug2}/comments`)
      .set('Authorization', userToken1)
      .send({ comment: 'This story is cool!' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'articleComment');
        expect(res.body.message).to.deep.equal('You have commented on the article');
        expect(res.body.articleComment).to.be.an('object');
        done();
      });
  });
  it('Should retrieve comments of the article', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug2}/comments`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'data', 'pages');
        expect(res.body.message).to.deep.equal('Comments retrieved');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
  it('Should update the comment of the article', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${articleSlug2}/comments/1`)
      .set('Authorization', userToken1)
      .send({ comment: 'I have changed my comment!' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'updatedComment');
        expect(res.body.message).to.deep.equal('Comment updated');
        expect(res.body.updatedComment).to.be.an('object');
        done();
      });
  });
  it('Should retrieve comment edit history of the article', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug2}/comments/1/history`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'data');
        expect(res.body.message).to.deep.equal('Successfully comment edit history retrieved');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('Should not retrieve comment edit history of the article when the user is not admin or super-admin', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug2}/comments/1/history`)
      .set('Authorization', userToken2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(403);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Sorry! You are not allowed to view this resource');
        done();
      });
  });
  it('Should not update the comment if it cannot be found', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${articleSlug2}/comments/10000`)
      .set('Authorization', userToken1)
      .send({ comment: 'I have changed my comment!' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Comment cannot be found');
        done();
      });
  });
  it('Should not comment on the article if it does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/comments')
      .set('Authorization', userToken1)
      .send({ comment: 'This story is cool!' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Article not found');
        done();
      });
  });
  it('Should not comment on the article if comment is not provided', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/comments`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Comment is required');
        done();
      });
  });
  it('Should delete the comment of the article', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${articleSlug2}/comments/1`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Comment deleted');
        done();
      });
  });
  it('Should not delete the comment if it cannot be found', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${articleSlug2}/comments/1`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Comment cannot be found');
        done();
      });
  });
  it('Should not retrieve comments because the article has none', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug2}/comments`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('The article has no comments at the moment');
        done();
      });
  });
  it('Should not retrieve reading statistics because the article will have never been read so far', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}/statistics`)
      .set('Authorization', userToken4)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('The article has never been read so far');
        done();
      });
  });
  it('Should return all avaiable articles', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        done();
      });
  });
  it('Should return error if invalid query parameters areprovided', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?invalid=true')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.error)
          .to.deep.equal('invalid query parameter. Only allowed page, limit, author, title and tags');
        done();
      });
  });
  it('Should return the previous page', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?page=2&limit=1')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        expect(res.body.previousPage).to.deep.equal(`${process.env.ARTICLE_URL}?page=1&limit=1`);
        done();
      });
  });
  it('Should return articles if paginary page query is not specified', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?limit=2')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        done();
      });
  });
  it('Should return articles if pagination limit query is not specified', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?page=2')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        done();
      });
  });
  it('Should return articles if pagination page is negative', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?page=-2')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        done();
      });
  });
  it('Should return articles if pagination limit is negative', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?limit=-2')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        done();
      });
  });
  it('Should return articles if wrong values are provided for pagination', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?page=one&limit=ten')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        expect(res.body.articles).to.be.an('array');
        expect(res.body.articles[0]).to.have.keys(
          'id',
          'slug',
          'title',
          'description',
          'body',
          'category',
          'commentCount',
          'tagList',
          'images',
          'authorId',
          'likes',
          'dislikes',
          'blocked',
          'createdAt',
          'updatedAt',
          'author',
          'readTime'
        );
        done();
      });
  });
  it('Should filter articles if title is not not provided in search', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?author=eric')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        done();
      });
  });
  it('Should filter articles if title and author are provided in search', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?author=eric&title=Growth')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        done();
      });
  });
  it('Should filter articles if title and author are provided in search', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles?tags=education')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.keys('articles', 'articlesCount', 'firstPage', 'lastPage', 'currentPage', 'nextPage', 'previousPage');
        done();
      });
  });
  it('Should return a particluar article', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('article');
        expect(res.body.article).to.have.keys(
          'id',
          'slug',
          'title',
          'description',
          'body',
          'category',
          'commentCount',
          'tagList',
          'images',
          'authorId',
          'likes',
          'dislikes',
          'blocked',
          'createdAt',
          'updatedAt',
          'author',
          'averageRatings',
          'readTime'

        );
        done();
      });
  });
  it('Should return an error if article is not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/eSlugjdfhgnh-bdsnbsjbc-ds')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Sorry! The requested article was not found.');
        done();
      });
  });

  it('Should like the article', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}/like`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'reaction');
        expect(res.body.message).to.deep.equal('You have liked the article');
        expect(res.body.reaction).to.be.an('object');
        done();
      });
  });
  it('Should dislike the article', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}/dislike`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'reaction');
        expect(res.body.message).to.deep.equal('You have disliked the article');
        expect(res.body.reaction).to.be.an('object');
        done();
      });
  });
  // Reading statistics
  it('Should retrieve reading statistics', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}/statistics`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'statistics');
        expect(res.body.message).to.deep.equal('Reading statistics retrieved');
        expect(res.body.statistics).to.be.an('object');
        done();
      });
  });
});
it('Should not retrieve reading statistics because the articles does not exist', (done) => {
  chai
    .request(app)
    .get(`/api/v1/articles/${invalidArticleSlug}/statistics`)
    .set('Authorization', userToken3)
    .end((err, res) => {
      if (err) done(err);
      expect(res).have.status(404);
      expect(res).to.be.an('object');
      expect(res.body).to.have.keys('message');
      expect(res.body.message).to.deep.equal('Article not found');
      done();
    });
});
describe('POST LIKES OR DISLIKES /api/v1/comments/id/{like/dislike}', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .send(dummyArticle.validArticle)
      .end((err, res) => {
        if (err) done(err);
        articleSlug = res.body.article.slug;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/comments`)
      .set('Authorization', userToken1)
      .send({ comment: 'This story is cool!' })
      .end((err, res) => {
        if (err) done(err);
        commentId = res.body.articleComment.id;
        done();
      });
  });

  it('Should return a message of failure when a user likes unavailable comment', (done) => {
    chai
      .request(app)
      .put('/api/v1/comments/10/like')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'Sorry! Comment not found.'
        );
        done();
      });
  });
  it('Should return a message of failure when a user dislikes unavailable comment', (done) => {
    chai
      .request(app)
      .put('/api/v1/comments/10/dislike')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'Sorry! Comment not found.'
        );
        done();
      });
  });
  it('Should return a message of success when a like is registered', (done) => {
    chai
      .request(app)
      .put(`/api/v1/comments/${commentId}/like`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'You have successfully liked this comment.'
        );
        done();
      });
  });
  it('Should retrieve comments of the article with correct number of likes and dislikes', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}/comments`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body.data[0].likes).to.equal(1);
        expect(res.body.data[0].dislikes).to.equal(0);
        done();
      });
  });
  it('Should return a message of success if a like is removed', (done) => {
    chai
      .request(app)
      .put(`/api/v1/comments/${commentId}/like`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'You have successfully removed your like for this comment.'
        );
        done();
      });
  });
  it('Should return a message of success when a comment is liked for a third time', (done) => {
    chai
      .request(app)
      .put(`/api/v1/comments/${commentId}/like`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'You have successfully liked this comment.'
        );
        done();
      });
  });
  it('Should return a message of sucess if a dislike is registered', (done) => {
    chai
      .request(app)
      .put(`/api/v1/comments/${commentId}/dislike`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'You have successfully disliked this comment.'
        );
        done();
      });
  });
  it('Should return a message of success when a comment is liked after the user disliked it', (done) => {
    chai
      .request(app)
      .put(`/api/v1/comments/${commentId}/like`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'You have successfully liked this comment.'
        );
        done();
      });
  });
  it('Should retrieve comments of the article with correct number of likes and dislikes', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}/comments`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body.data[0].likes).to.equal(1);
        expect(res.body.data[0].dislikes).to.equal(0);
        done();
      });
  });
  it('Should return  a message sucess if a dislike is registered again', (done) => {
    chai
      .request(app)
      .put(`/api/v1/comments/${commentId}/dislike`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'You have successfully disliked this comment.'
        );
        done();
      });
  });
  it('Should return a message sucess if a dislike again ', (done) => {
    chai
      .request(app)
      .put(`/api/v1/comments/${commentId}/dislike`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'You have successfully removed your dislike for this comment.'
        );
        done();
      });
  });
  it('Should retrieve comments of the article with correct number of likes and dislikes', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}/comments`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body.data[0].likes).to.equal(0);
        expect(res.body.data[0].dislikes).to.equal(0);
        done();
      });
  });
  it('Should return a message sucess if a dislike is registered again', (done) => {
    chai
      .request(app)
      .put(`/api/v1/comments/${commentId}/dislike`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'You have successfully disliked this comment.'
        );
        done();
      });
  });
});
// Update Article Tests
describe('UPDATE /api/v1/articles/:slug', () => {
  it('Should return an error if the the user is not the author', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', invalidToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(403);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal(
          'Sorry! You are not allowed to view or make changes to this resource'
        );
        done();
      });
  });
  it('Should return an error if the slug provided do not correspond to any article', (done) => {
    chai
      .request(app)
      .put('/api/v1/articles/kenyan-boy-making-3vmjzjpyc0a')
      .set('Authorization', userToken2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Sorry! The specified article does not exist');
        done();
      });
  });
  it('Should return error if category is not a string', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.incorrectCategory)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('category must be a string');
        done();
      });
  });
  it('Should return error if taglist is not a string', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.incorrectTagList)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('tags must be a string');
        done();
      });
  });
  it('Should return message of successfully update when title is not updated', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.updateArticleLessTitle)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body).to.have.key('article', 'message');
        expect(res.body.message).to.deep.equal('Article updated successfully');
        done();
      });
  });
  it('Should take the old title and slug if title is not updated', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.updateArticleLessTitle)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body.article.slug).to.deep.equal(articleSlug);
        done();
      });
  });
  it('Should return  the old description if it was not updated', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.updateMissingDesc)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body.article.description).to.deep.equal(
          'How to demonstrate growth mindset from a new perspective'
        );
        done();
      });
  });
  it('Should return error if taglist is not set', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.updateMissingtags)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body).to.have.key('article', 'message');
        done();
      });
  });
  it('Should return  the old body if it was not updated', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.updateMissingBody)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body.article.body).to.deep.equal(
          'is simply dummy text of the printing and typesetting industry Lorem Ipsum has'
        );
        done();
      });
  });
  it('Should return the old tags if they was not updated', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.updateMissingtags)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body.article.tagList).to.deep.equal(['Bango', 'Hip-Hop', 'R&B']);
        done();
      });
  });
  it('Should return the old category if it was not updated', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.updateMissingCategory)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body.article.category).to.deep.equal('Music');
        done();
      });
  });
  it('Should return a new slug when title is updated', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .set('Authorization', userToken1)
      .send(dummyArticle.updateArticleWithTitle)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body).to.have.key('article', 'message');
        expect(res.body.message).to.deep.equal('Article updated successfully');
        newArticleSlug = res.body.article.slug;
        done();
      });
  });
});
// Rating Tests

describe('POST /api/v1/articles/{articleId}/rate', () => {
  it('Should not be able to rate your own article', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleId}/rate`)
      .set('Authorization', userToken1)
      .send({ rate: 1 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.error).to.deep.equal('Sorry! You cannot rate your article');
        done();
      });
  });
  it('Should not be able to rate the article when there is no rate provided', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleId}/rate`)
      .set('Authorization', userToken2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.error).to.deep.equal('Rate is required');
        done();
      });
  });
  it('Should not be able to rate the article which does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/5098/rate')
      .set('Authorization', userToken2)
      .send({ rate: 3 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.error).to.deep.equal('This Article does not exist');
        done();
      });
  });
  it('Should not be able to rate the article if the id is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/m/rate')
      .set('Authorization', userToken2)
      .send({ rate: 3 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body.error).to.deep.equal('articleId must be a number');
        done();
      });
  });

  it('Should create and return an article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken2)
      .send(dummyArticle.validArticleMine)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res.body.article).to.have.property('images');
        toRate = res.body.article.id;
        expect(res.body).to.have.key('article');
        slugMe = res.body.article.slug;
        done();
      });
  });
  it('Should successfully rate an article', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${toRate}/rate`)
      .set('Authorization', userToken1)
      .send({ rate: 3 })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'data');
        expect(res.body.message).to.deep.equal('Successfully rated this article');
        done();
      });
  });
  it('Should return a particluar article', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${slugMe}`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('article');
        expect(res.body.article).to.have.keys(
          'id',
          'slug',
          'title',
          'description',
          'body',
          'blocked',
          'category',
          'commentCount',
          'tagList',
          'images',
          'authorId',
          'likes',
          'dislikes',
          'createdAt',
          'updatedAt',
          'author',
          'averageRatings',
          'readTime'
        );
        done();
      });
  });
});


// getting ratings
describe('GET /api/v1/articles/{articleId}/rate', () => {
  it('Should be be able to get ratings', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleId}/rate`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        done();
      });
  });
  it('Should not be be able to get ratings when the article id is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/m/rate')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('articleId must be a number');
        done();
      });
  });
  it('Should not be be able to get ratings when the article is not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/400/rate')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Sorry! The specified article does not exist');
        done();
      });
  });
});

//  sharing article
describe('POST api/v1/articles/:slug/share/:option', () => {
  it('Should share the post on gmail', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${newArticleSlug}/share/gmail`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('message', 'share');
        expect(res.body.share).to.be.an('object');
        expect(res.body.message).to.deep.equal('Successfully shared the article on gmail');
        done();
      });
  });
  it('Should share the post on twitter', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${newArticleSlug}/share/twitter`)
      .set('Authorization', userToken2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('message', 'share');
        expect(res.body.share).to.be.an('object');
        expect(res.body.message).to.deep.equal('Successfully shared the article on twitter');
        done();
      });
  });
  it('Should share the post on facebook', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${newArticleSlug}/share/facebook`)
      .set('Authorization', userToken2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('message', 'share');
        expect(res.body.share).to.be.an('object');
        expect(res.body.message).to.deep.equal('Successfully shared the article on facebook');
        done();
      });
  });
  it('Should not share the article if it is not found', (done) => {
    chai.request(app)
      .post('/api/v1/articles/this-article-is-not-valid/share/gmail')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('article not found');
        done();
      });
  });
});

// Deleting article Tests.
describe('DELETE /api/v1/articles/:slug', () => {
  it('Should return an error if the the user is not the author', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${newArticleSlug}`)
      .set('Authorization', invalidToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(403);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal(
          'Sorry! You are not allowed to view or make changes to this resource'
        );
        done();
      });
  });
  it('Should return an error if the the user is not the admin or superadmin', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${newArticleSlug}`)
      .set('Authorization', userToken2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(403);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal(
          'Sorry! You are not allowed to view or make changes to this resource'
        );
        done();
      });
  });
  it('Should return an error if the slug provided do not correspond to any article', (done) => {
    chai
      .request(app)
      .delete('/api/v1/articles/kenyan-boy-making-3vmjzjpyc0a')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Sorry! The specified article does not exist');
        done();
      });
  });
  it('Should delete an article and return a success message', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${newArticleSlug}`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res.body).to.have.key('message');
        expect(res.body.message).to.deep.equal('Article successful deleted!');
        done();
      });
  });
});
