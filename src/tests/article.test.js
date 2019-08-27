import chaiHttp from 'chai-http';
import chai from 'chai';
import fs from 'fs';
import app from '../index';
import dummy from './dummyData';
import { Follow } from '../sequelize/models';
import { genToken } from '../helpers/auth';

chai.use(chaiHttp);
const { expect } = chai;
const { dummyArticle, dummyUser } = dummy;
let articleId;
const invalidToken = genToken(dummyArticle.invalidUserToken);
// Start of Tests
before(async () => {
  await Follow.create(dummyUser.validFollower);
});

let userToken1 = '';
let userToken2 = '';
let articleSlug;
let newArticleSlug;

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
  it('Should return error if wrong content-type is used', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('content-type', 'application/json')
      .set('Authorization', userToken1)
      .send(dummyArticle.validArticle)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(415);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal(
          'Wrong content-type. Please change it to multipart/form-data and try again.'
        );
        done();
      });
  });
  it('Should return error if provided token is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', invalidToken)
      .field(dummyArticle.validArticle)
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
      .field('title', '')
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
      .field(dummyArticle.incompleteTitle)
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
      .field(dummyArticle.missingDescription)
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
      .field(dummyArticle.incompleteDescription)
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
      .field(dummyArticle.missingBody)
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
      .field(dummyArticle.lessCategory)
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
      .field(dummyArticle.incorrectCategory)
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
      .field(dummyArticle.incorrectTagList)
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
      .field(dummyArticle.lessTags)
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
      .field(dummyArticle.validArticle)
      .attach('image', fs.readFileSync('src/tests/dummyData/avatar.jpg'), 'avatar.jpg')
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
  it('Should return all avaiable articles', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('articles');
        expect(res.body.articles).to.be.an('array');
        expect(res.body.articles[0]).to.have.keys(
          'id',
          'slug',
          'title',
          'description',
          'body',
          'category',
          'tagList',
          'images',
          'authorId',
          'likes',
          'dislikes',
          'createdAt',
          'updatedAt',
          'author',
          'readTime'
        );
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
          'tagList',
          'images',
          'authorId',
          'likes',
          'dislikes',
          'createdAt',
          'updatedAt',
          'author',
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
          'Sorry! You are not allowed to make changes to this resource'
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
      .field(dummyArticle.incorrectCategory)
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
      .field(dummyArticle.incorrectTagList)
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
      .field(dummyArticle.updateArticleLessTitle)
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
      .field(dummyArticle.updateArticleLessTitle)
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
      .field(dummyArticle.updateMissingDesc)
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
      .field(dummyArticle.updateMissingtags)
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
      .field(dummyArticle.updateMissingBody)
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
      .field(dummyArticle.updateMissingtags)
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
      .field(dummyArticle.updateMissingCategory)
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
      .field(dummyArticle.updateArticleWithTitle)
      .attach('image', fs.readFileSync('src/tests/dummyData/avatar.jpg'), 'avatar.jpg')
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

describe('POST /api/v1/articles/{id}/rate', () => {
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
      .post('/api/v1/articles/5/rate')
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
        expect(res.body.error).to.deep.equal('id must be a number');
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
          'Sorry! You are not allowed to make changes to this resource'
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
