import chaiHttp from 'chai-http';
import chai from 'chai';
import fs from 'fs';
import app from '../index';
import dummy from './dummyData';

chai.use(chaiHttp);
const { expect } = chai;
const { dummyArticle, dummyHighlight } = dummy;

let userToken1;
let articleSlug;
// let articleSlug2;
// let newArticleSlug;

before((done) => {
  chai
    .request(app)
    .post('/api/v1/users/login')
    .send({
      email: 'admin@gmail.com',
      password: 'Admin-user12'
    })
    .end((err, res) => {
      if (err) done(err);
      userToken1 = res.body.data.token;
      done();
    });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should create a new article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken1)
      .field(dummyArticle.anotherArticle)
      .attach('image', fs.readFileSync('src/tests/dummyData/avatar.jpg'), 'avatar.jpg')
      .end((err, res) => {
        if (err) done(err);
        articleSlug = res.body.article.slug;
        done();
      });
  });
  it('Should return an error if startIndex is missing', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send({})
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Start Index is required');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return error if text to highlight is missing', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.noText)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Text to highlight is required');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return error if start index is not a number', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.invalidIndex)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('startIndex must be a number');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return error if text is an empty string', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.invalidText)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('text is not allowed to be empty');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return error if comment is an empty string', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.ivalidComment)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('comment is not allowed to be empty');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return error if comment is not a string', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.nonStringComment)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Comment must be a string');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return error if text is not a string', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.nonStringText)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Text must be a string');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return error if article is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/897465/highlights')
      .set('Authorization', userToken1)
      .send(dummyHighlight.validHighlight)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Article 897465 does not exist');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return error if text to highlight is not found', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.textNotFound)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Text texttexttext not found in the article');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return the highlighted text if found', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.noCommentHighlight)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.keys('message', 'highlight');
        expect(res.body.message)
          .to.deep.equal('Text successfully highlighted');
        expect(res.body.highlight).to.have
          .keys('articleId', 'id', 'createdAt', 'updatedAt', 'userId', 'startIndex', 'text', 'comment');
        done();
      });
  });
});
describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should delete a highlighted text if highlighted twice', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.noCommentHighlight)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys('message');
        expect(res.body.message)
          .to.deep.equal('Highlight successfully deleted');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should return the highlighted text if found with comment', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.validHighlight)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.keys('message', 'highlight');
        expect(res.body.message)
          .to.deep.equal('Text successfully commented on');
        expect(res.body.highlight).to.have
          .keys('articleId', 'id', 'createdAt', 'updatedAt', 'userId', 'startIndex', 'text', 'comment');
        done();
      });
  });
});

describe('POST /api/v1/articles/:slug/highlights', () => {
  it('Should delete a highlighted text if highlighted twice', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/highlights`)
      .set('Authorization', userToken1)
      .send(dummyHighlight.validHighlight)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys('message');
        expect(res.body.message)
          .to.deep.equal('Highlight successfully deleted');
        done();
      });
  });
});
