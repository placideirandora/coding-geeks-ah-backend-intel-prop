import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

let adminToken = '';
let userToken = '';

describe('POST /api/v1/profiles/notification', () => {
  it('Should Login user and return token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'eric.malaba@gmail.com',
        password: 'Superadmin12'
      })
      .end((err, res) => {
        if (err) done(err);
        adminToken = res.body.data.token;
        done();
      });
  });
  it('Should Login user and return token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'carlos@gmail.com',
        password: 'User1234'
      })
      .end((err, res) => {
        if (err) done(err);
        userToken = res.body.data.token;
        done();
      });
  });
  it('User should be able to unsubscribe to email notification', (done) => {
    chai.request(app)
      .patch('/api/v1/profiles/eubule/notification/unsubscribe')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('You have successfully unsubscribed to email notification');
        done();
      });
  });
  it('User should be able to subscribe to email notification', (done) => {
    chai.request(app)
      .patch('/api/v1/profiles/eubule/notification/subscribe')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('You have successfully subscribed to email notification');
        done();
      });
  });
  it('User should not be able to subscribe or unsubscribe to email notification', (done) => {
    chai.request(app)
      .patch('/api/v1/profiles/eubule/notification/invalidsubscribe')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Please use either subscribe or unsubscribe');
        done();
      });
  });
  it('User should not be able to get notification if not exist', (done) => {
    chai.request(app)
      .get('/api/v1/profiles/notification/all')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('No notification found at the moment');
        done();
      });
  });
  it('User should not be able to read notification if not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/profiles/notification/30/read')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('No notification found at the moment');
        done();
      });
  });
  it('User should not be able to read all notification if not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/profiles/notification/read/all')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('No notification found at the moment');
        done();
      });
  });
  it('User should be able to get all notifications', (done) => {
    chai.request(app)
      .get('/api/v1/profiles/notification/all')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.keys('id', 'userId', 'message', 'url', 'status', 'createdAt', 'updatedAt');
        done();
      });
  });
  it('User should mark notification as read', (done) => {
    chai.request(app)
      .patch('/api/v1/profiles/notification/1/read')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Notification successfully marked as read');
        done();
      });
  });
  it('User should mark notification as read', (done) => {
    chai.request(app)
      .patch('/api/v1/profiles/notification/read/all')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Notifications successfully marked as read');
        done();
      });
  });
});
