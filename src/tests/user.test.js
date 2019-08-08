import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import dummy from './dummyData';


chai.use(chaiHttp);
const { expect } = chai;
const { dummyUser } = dummy;

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid firstName', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.invalidFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('First name must contain only alpha-numeric characters');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid firstName', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.firstNumFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('First name cannot begin with a number');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing firatName field', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.missingFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('First name is required');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few characters for name', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.lessFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('First name must be at least 2 characters long');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few numbers for name', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.numFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('First name must be a string');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid lasttName', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.invalidLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error)
          .to.deep
          .equal('Last name must contain only alpha numeric characters');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid Last name', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.firstNumLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('Last name cannot begin with a number');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing lasttName field', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.missingLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('Last name is required');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few characters for name', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.lessLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('Last name must be at least 2 characters long');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few numbers for name', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.numLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('Last name must be a string');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid UserName', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.invalidUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('User name must contain only alpha-numeric characters');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid User name', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.firstNumUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('User name cannot begin with a number');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing userName field', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.missingUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('User name is required');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few characters for name', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.lessUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('User name must be at least 2 characters long');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few numbers for name', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.numUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('User name must be a string');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.invalidEmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('email must be a valid email');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing email field', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.missingEmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('email is required');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.invalidPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error)
          .to.deep
          .equal('Password must be at least 8 characters with at least a number, Upper and lower cases special character');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing password field', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.missingPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('password is required');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with invalid confirm password type', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.numConfirmPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('Confirm password must be a string');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing confirm', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.missingConfirm)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('Confirm password is required');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with when passwords do not match', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.unmatchedPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.error).to.deep.equal('Passwords must much');
        expect(res.body.status).to.deep.equal('failed');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should successfully register user upon correct validation', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.validUser)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'message', 'data');
        expect(res.body.status).to.deep.equal('success');
        expect(res.body.message).to.deep.equal('User created');
        expect(res.body.data).to.have.keys('token', 'id', 'firstName', 'lastName', 'userName', 'email', 'role');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Sould return error if user tries to signup with an existing email', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.existingEmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(409);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.status).to.deep.equal('failed');
        expect(res.body.error).to.deep.equal('Email kadhut@gmail.com already exists');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Sould return error if user tries to signup with an existing userName', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(dummyUser.existingUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(409);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.status).to.deep.equal('failed');
        expect(res.body.error).to.deep.equal('userName Kadhut already taken');
        done();
      });
  });
});