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
        expect(res).to.be.an('object');
        done();
      });
  });
  it('Should login the user with Twitter', (done) => {
    chai.request(app)
      .get('/api/v1/auth/twitter/test')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        done();
      });
  });
  it('Should login the user with Facebook', (done) => {
    chai.request(app)
      .get('/api/v1/auth/facebook/test')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        done();
      });
  });
});
