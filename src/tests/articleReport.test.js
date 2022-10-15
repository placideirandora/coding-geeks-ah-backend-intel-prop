import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import dummy from './dummyData';
import { User } from '../sequelize/models';
import { hashedPassword } from '../helpers/auth';

chai.use(chaiHttp);
const { expect } = chai;

const { dummyArticle, dummyUser } = dummy;


let userToken1;
let userToken2;
let userToken3;
let userToken4;
let articleSlug;
const invalidSlug = 'article-not-found';
let superAdminToken;

before(async () => {
  const { password } = dummyUser.newUserForReport;
  dummyUser.newUserForReport.password = hashedPassword(password);
  await User.create(dummyUser.newUserForReport);
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
      email: 'reporter@gmail.com',
      password: 'Jamal1230!'
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
      email: 'ray@gmail.com',
      password: 'Admin1234'
    })
    .end((err, res) => {
      if (err) done(err);
      userToken4 = res.body.data.token;
      done();
    });
});
before((done) => {
  const user = {
    email: 'eric.malaba@gmail.com',
    password: 'Superadmin12',
  };
  chai.request(app)
    .post('/api/v1/users/login')
    .send(user)
    .end((err, res) => {
      if (err) done(err);
      superAdminToken = res.body.data.token;
      done();
    });
});
describe('POST /api/v1/articles/:articleSlug/reports', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', userToken3)
      .send(dummyArticle.validArticle)
      .end((err, res) => {
        if (err) done(err);
        articleSlug = res.body.article.slug;
        done();
      });
  });
  it('Should not be able to retreive all availabele reports if no report created yet', (done) => {
    chai.request(app)
      .get('/api/v1/articles/reports/all')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('No article reported at the moment');
        done();
      });
  });
  it('Should be able to report an article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/reports`)
      .set('Authorization', userToken2)
      .send({
        reason: 'plagiarism',
        description: 'this is article is sourced somewhere else'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('report');
        expect(res.body.report).to.have.keys('id', 'slug', 'reason', 'description', 'updatedAt', 'createdAt', 'reporter');
        done();
      });
  });
  it('Should not be able to report an article if reason is not provided', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/reports`)
      .set('Authorization', userToken2)
      .send({
        description: 'this is article is sourced somewhere else'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Reason is required');
        done();
      });
  });
  it('Should not be able to report an article if reason is less than 5 character', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/reports`)
      .set('Authorization', userToken2)
      .send({
        reason: 'plag'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Reason must have atleast 5 characters');
        done();
      });
  });
  it('Should not be able to report an article if article does not exist', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${invalidSlug}/reports`)
      .set('Authorization', userToken2)
      .send({
        reason: 'plagiarism',
        description: 'this is article is sourced somewhere else'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Article not found');
        done();
      });
  });
  it('Should not be able to report his own article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/reports`)
      .set('Authorization', userToken3)
      .send({
        reason: 'plagiarism',
        description: 'this is article is sourced somewhere else'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Sorry! You cannot report your own article');
        done();
      });
  });
  it('Should not be able to report an article twice', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${articleSlug}/reports`)
      .set('Authorization', userToken2)
      .send({
        reason: 'plagiarism',
        description: 'this is article is sourced somewhere else'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Sorry! You already reported this article');
        done();
      });
  });
  it('Should be able to retreive all availabele report', (done) => {
    chai.request(app)
      .get('/api/v1/articles/reports/all')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('reports');
        expect(res.body.reports).to.be.an('array');
        expect(res.body.reports[0]).to.have.keys('id', 'slug', 'reason', 'description', 'updatedAt', 'createdAt', 'reporter', 'reporterId', 'articleId');
        done();
      });
  });
  it('Should be able to retreive all availabele reports it is admin', (done) => {
    chai.request(app)
      .get('/api/v1/articles/reports/all')
      .set('Authorization', userToken4)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('reports');
        expect(res.body.reports).to.be.an('array');
        expect(res.body.reports[0]).to.have.keys('id', 'slug', 'reason', 'description', 'updatedAt', 'createdAt', 'reporter', 'reporterId', 'articleId');
        done();
      });
  });
  it('Should not be able to retreive report if it is not admin', (done) => {
    chai.request(app)
      .get('/api/v1/articles/reports/all')
      .set('Authorization', userToken2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('You do not have enough priveledges to continue');
        done();
      });
  });
  it('Should be able to retreive reports of a specific article', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/reports`)
      .set('Authorization', userToken4)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('reports');
        expect(res.body.reports).to.be.an('array');
        expect(res.body.reports[0]).to.have.keys('id', 'slug', 'reason', 'description', 'updatedAt', 'createdAt', 'reporter', 'reporterId', 'articleId');
        done();
      });
  });
  it('Should be able to retreive a specific report', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${articleSlug}/reports/1`)
      .set('Authorization', userToken4)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('report');
        expect(res.body.report).to.have.keys('id', 'slug', 'reason', 'description', 'updatedAt', 'createdAt', 'reporter', 'reporterId', 'articleId');
        done();
      });
  });
  it('Should block an article', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/block`)
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'blockedArticle');
        expect(res.body.message).to.deep.equal('Article blocked');
        expect(res.body.blockedArticle).to.be.an('object');
        done();
      });
  });
  it('Should not block an article when it is already blocked', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/block`)
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('The article is already blocked');
        done();
      });
  });
  it('Should not block an article which does not exist', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${invalidSlug}/block`)
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Article not found in the reported articles');
        done();
      });
  });
  it('Should unblock an article', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/unblock`)
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Article unblocked');
        done();
      });
  });
  it('Should not unblock an article twice', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/unblock`)
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Article not found in the blocked articles');
        done();
      });
  });
  it('Should not be able to delete report if id is not a number', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${articleSlug}/reports/1dsdd`)
      .set('Authorization', userToken2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('reportId must be a number');
        done();
      });
  });
});
