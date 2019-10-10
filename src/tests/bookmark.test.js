import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import dummy from './dummyData';

chai.use(chaiHttp);
const { expect } = chai;
const { dummyArticle } = dummy;
let userToken1;
let articleSlug;


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

describe('POST AND GET AND DELETE /api/v1/Bookmarks', () => {
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

  it('Should return message if no bookmark is found ', (done) => {
    chai
      .request(app)
      .get('/api/v1/bookmarks')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'Sorry! No bookmarks found at the moment.'
        );
        done();
      });
  });
  it('Should receive a message after adding a bookmark', (done) => {
    chai
      .request(app)
      .post(`/api/v1/bookmarks/${articleSlug}`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'Bookmark added successfully'
        );
        done();
      });
  });
  it('Should return message if  bookmarks are found ', (done) => {
    chai
      .request(app)
      .get('/api/v1/bookmarks')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('bookmarks');
        done();
      });
  });
  it('Should return message if article is already bookmarked ', (done) => {
    chai
      .request(app)
      .post(`/api/v1/bookmarks/${articleSlug}`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(409);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'Article already bookmarked'
        );
        done();
      });
  });
  it('Should unbookmark an article after it has been bookmarked ', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/bookmarks/${articleSlug}`)
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal(
          'Bookmark deleted successfully'
        );
        done();
      });
  });
});
