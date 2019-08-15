import chaiHttp from 'chai-http';
import chai from 'chai';
import fs from 'fs';
import app from '../index';
import dummy from './dummyData';
import { genToken } from '../helpers/auth';

chai.use(chaiHttp);
const { expect } = chai;
const { dummyUser } = dummy;

const userToken = genToken(dummyUser.validUser);

describe('GET /api/v1/profiles', () => {
  it('Should successfully retrieve user profile', (done) => {
    chai.request(app)
      .get('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .send(dummyUser.validUser)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'data');
        expect(res.body.message).to.deep.equal('Successfully retrieved a user profile');
        expect(res.body.data).to.have.keys('userName', 'bio', 'image');
        done();
      });
  });
  it('Should not retrieve user profile when there is none', (done) => {
    chai.request(app)
      .get('/api/v1/profiles/Kadhutiiii')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Profile for Kadhutiiii not found');
        done();
      });
  });
});

describe('GET /api/v1/profiles', () => {
  it('Should return an error message if user tries to fetch user profiles before they log in', (done) => {
    chai.request(app)
      .get('/api/v1/profiles')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Please log in or Register');
        done();
      });
  });
});

describe('GET /api/v1/profiles', () => {
  it('Should return a list of profiles if the user is identified', (done) => {
    chai.request(app)
      .get('/api/v1/profiles')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('message', 'data');
        expect(res.body.message).to.deep.equal('2 Users found');
        expect(res.body.data[0]).to.have.keys('userName', 'bio', 'image');
        done();
      });
  });
});

describe('GET /api/v1/profiles', () => {
  it('Should return an error message if user tries to fetch user profiles before they log in', (done) => {
    chai.request(app)
      .get('/api/v1/profiles')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Please log in or Register');
        done();
      });
  });
});

describe('PUT /api/v1/profiles', () => {
  it('should get an error when there is a wrong input profile name', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhutii')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(403);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Sorry! You cannot edit the profile that is not yours');
        done();
      });
  });

  it('should not update the profile when the username updated is not a string', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .send(dummyUser.invalidProfile1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .to.be.a('string');
        done();
      });
  });
  it('should not update the profile when the username updated is less than 2 characters long', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .send(dummyUser.invalidProfile2)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .to.be.a('string');
        done();
      });
  });
  it('should not update the profile when the username updated is contains special characters', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .send(dummyUser.invalidProfile3)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .to.be.a('string');
        done();
      });
  });
  it('should not update the profile when the username updated starts with a number', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .send(dummyUser.invalidProfile4)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .to.be.a('string');
        done();
      });
  });
  it('should not update the profile when the bio updated is not a string', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .send(dummyUser.invalidProfile5)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .to.be.a('string');
        done();
      });
  });
  it('should not update the profile when the bio updated is less than 20 characters long', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .send(dummyUser.invalidProfile6)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .to.be.a('string');
        done();
      });
  });
  it('should not update the profile when the user aploads a file which is not an image', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .field(dummyUser.updateProfile)
      .attach('image', fs.readFileSync('src/tests/dummyData/dummyUser.js'), 'dummyUser.js')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .to.be.a('string');
        done();
      });
  });
  it('should update the profile', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/Kadhut')
      .set('Authorization', userToken)
      .field(dummyUser.updateProfile)
      .attach('image', fs.readFileSync('src/tests/dummyData/avatar.jpg'), 'avatar.jpg')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.data)
          .to.have.property('bio');
        expect(res.body.data)
          .to.have.property('image');
        expect(res.body.data.password).to.be.equal(undefined);
        done();
      });
  });

  it('should return error id user tries to update with and existing user name', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/kaka21')
      .set('Authorization', userToken)
      .field(dummyUser.updateProfile)
      .attach('image', fs.readFileSync('src/tests/dummyData/avatar.jpg'), 'avatar.jpg')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body)
          .to.have.property('message');
        expect(res.body.message)
          .to.deep.equal('Sorry! The profile username taken, try another one');
        done();
      });
  });
  it('should update the profile even when image is not provided', (done) => {
    chai
      .request(app)
      .put('/api/v1/profiles/kaka21')
      .set('Authorization', userToken)
      .field(dummyUser.profileUpdate)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys('data', 'message');
        expect(res.body.message).to.deep.equal('Successfully updated the profile');
        expect(res.body.data)
          .to.have.keys('bio', 'userName', 'image', 'email', 'upadatedAt');
        done();
      });
  });

  it('should get an error message', (done) => {
    chai
      .request(app)
      .get('/api/v1/profiles/1000000')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property('message')
          .to.be.a('string');
        done();
      });
  });
});
