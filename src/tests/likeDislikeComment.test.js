import chaiHttp from 'chai-http';
import chai from 'chai';
import fs from 'fs';
import app from '../index';
import dummy from './dummyData';

chai.use(chaiHttp);
const { expect } = chai;
const { dummyArticle } = dummy;
let userToken1;
let articleSlug;
let commentId;

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
      userToken1 = res.body.data.token;
      done();
    });
});

describe('POST LIKES OR DISLIKES /api/v1/comments/id/{like/dislike}', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .field(dummyArticle.validArticle)
      .attach('image', fs.readFileSync('src/tests/dummyData/avatar.jpg'), 'avatar.jpg')
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
        expect(res.body.comments[0].likes).to.equal(1);
        expect(res.body.comments[0].dislikes).to.equal(0);
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
        expect(res.body.comments[0].likes).to.equal(1);
        expect(res.body.comments[0].dislikes).to.equal(0);
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
        expect(res.body.comments[0].likes).to.equal(0);
        expect(res.body.comments[0].dislikes).to.equal(0);
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
