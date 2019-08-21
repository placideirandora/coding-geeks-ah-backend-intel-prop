import chaiHttp from 'chai-http';
import chai from 'chai';
import fs from 'fs';
import app from '../index';
import dummy from './dummyData';
import { genToken } from '../helpers/auth';


chai.use(chaiHttp);
const { expect } = chai;
const { dummyArticle } = dummy;

const invalidToken = genToken(dummyArticle.invalidUserToken);
let userToken = '';

describe('POST AND GET /api/v1/articles', () => {
  it('Should Login user and return token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'malabadev6@gmail.com',
        password: 'Super-admin12'
      })
      .end((err, res) => {
        if (err) done(err);
        userToken = res.body.data.token;
        done();
      });
  });
  it('Should receive a message if no articles found', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
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
      .set('Authorization', userToken)
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
      .set('Authorization', userToken)
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
      .set('Authorization', userToken)
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
      .set('Authorization', userToken)
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
      .set('Authorization', userToken)
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
      .set('Authorization', userToken)
      .field(dummyArticle.missingBody)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Body is required');
        done();
      });
  });
  it('Should return error if category is not a string', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken)
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
      .set('Authorization', userToken)
      .field(dummyArticle.incorrectTagList)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('tags must be a string');
        done();
      });
  });
  it('Should create and return an article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken)
      .field(dummyArticle.validArticle)
      .attach('image', fs.readFileSync('src/tests/dummyData/avatar.jpg'), 'avatar.jpg')
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res.body.article)
          .to.have.property('images');
        expect(res.body).to.have.key('article');
        done();
      });
  });
  it('Should return all avaiable articles', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('articles');
        done();
      });
  });
});
