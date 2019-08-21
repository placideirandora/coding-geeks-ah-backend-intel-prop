import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';


chai.use(chaiHttp);
const { expect } = chai;

describe('Should test social login', () => {
  it('Should login the user with Google', (done) => {
    chai.request(app)
      .get('/api/v1/auth/google/test')
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('message', 'data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.keys('token', 'username', 'email');
        expect(res.body.data).to.have.property('token').to.be.a('string');
        expect(res.body.message).to.deep.equal('Welcome, You have successfully logged in with Google!');
        done();
      });
  });
  it('Should login the user with Twitter', (done) => {
    chai.request(app)
      .get('/api/v1/auth/twitter/test')
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('message', 'data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.keys('token', 'username', 'email');
        expect(res.body.data).to.have.property('token').to.be.a('string');
        expect(res.body.message).to.deep.equal('Welcome, You have successfully logged in with Twitter!');
        done();
      });
  });
  it('Should login the user with Facebook', (done) => {
    chai.request(app)
      .get('/api/v1/auth/facebook/test')
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('message', 'data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.keys('token', 'username', 'email');
        expect(res.body.data).to.have.property('token').to.be.a('string');
        expect(res.body.message).to.deep.equal('Welcome, You have successfully logged in with Facebook!');
        done();
      });
  });
});
