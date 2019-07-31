import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Test for a url not found', () => {
  it('Should return a status code 404 when url supplied is not found', () => {
    chai
      .request(app)
      .get('/error')
      .end((err, res) => {
        res.body.should.have.status(404);
      });
  });
});

describe('Test the base url / for author-haven', () => {
  it('Should return a status 200', () => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        res.body.should.have.status(200);
      });
  });
});
