<<<<<<< HEAD
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
        expect(res.body.error).to.deep.equal('firstName must only contain alpha-numeric characters');
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
        expect(res.body.error).to.deep.equal('firstName is required');
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
        expect(res.body.error).to.deep.equal('firstName length must be at least 4 characters long');
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
        expect(res.body.error).to.deep.equal('firstName must be a string');
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
        expect(res.body.error).to.deep.equal('lastName must only contain alpha-numeric characters');
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
        expect(res.body.error).to.deep.equal('lastName is required');
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
        expect(res.body.error).to.deep.equal('lastName length must be at least 4 characters long');
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
        expect(res.body.error).to.deep.equal('lastName must be a string');
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
        expect(res.body.error).to.deep.equal('userName must only contain alpha-numeric characters');
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
        expect(res.body.error).to.deep.equal('userName is required');
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
        expect(res.body.error).to.deep.equal('userName length must be at least 3 characters long');
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
        expect(res.body.error).to.deep.equal('userName must be a string');
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
          .equal('password must be at least 8 characters containing at least a number, Upper and lower cases');
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
=======
// import chaiHttp from 'chai-http';
// import chai from 'chai';
// import app from '../../app';
// import dummyUser from './dummyData';


// chai.use(chaiHttp);
// const { expect } = chai;

// describe('POST /api/v1/users', () => {
//   it('Should return error if user tries to signup with an invalid firstName', (done) => {
//     chai.request(app)
//       .post('/api/v1/users')
//       .send(dummyUser)
//       .end((err, res) => {
//         if (err) done(err);
//         expect(res).have.status(400);
//         expect(res).to.be.an('object');
//         expect(res.body).to.have.keys('status', 'error');
//         // expect(res.body.error).to.deep.equal('firstName, lastName, email and ');
//         expect(res.body.status).to.deep.equal(400);
//         done();
//       });
//   });
// });
>>>>>>> fix(testing bug): tests not runnig
