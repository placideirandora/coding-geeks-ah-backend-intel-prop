import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import dummy from './dummyData';
import { User } from '../sequelize/models';
import { hashedPassword } from '../helpers/auth';


chai.use(chaiHttp);
const { expect } = chai;
const { dummyUser } = dummy;

let userToken;
let userToken2;
let superAdminToken;
let adminToken;

before(async () => {
  const { password } = dummyUser.newUser;
  dummyUser.newUser.password = hashedPassword(password);
  await User.create(dummyUser.newUser);
});

before(async () => {
  const { password } = dummyUser.newUserFollow;
  dummyUser.newUserFollow.password = hashedPassword(password);
  await User.create(dummyUser.newUserFollow);
});
before((done) => {
  const user = {
    email: 'jamal@gmail12.com',
    password: 'Jamal1230!'
  };
  chai
    .request(app)
    .post('/api/v1/users/login')
    .send(user)
    .end((err, res) => {
      if (err) done(err);
      userToken = res.body.data.token;
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

before((done) => {
  const admin = {
    email: 'admin@gmail.com',
    password: 'Admin-user12',
  };
  chai.request(app)
    .post('/api/v1/users/login')
    .send(admin)
    .end((err, res) => {
      if (err) done(err);
      adminToken = res.body.data.token;
      done();
    });
});
before((done) => {
  const user = {
    email: 'rick@gmail.com',
    password: 'Jamal1230!'
  };
  chai
    .request(app)
    .post('/api/v1/users/login')
    .send(user)
    .end((err, res) => {
      if (err) done(err);
      userToken2 = res.body.data.token;
      done();
    });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid firstName', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.invalidFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('First name cannot contain number or special characters');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid firstName', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.firstNumFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('First name cannot contain number or special characters');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing firatName field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.missingFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('First name is required');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few characters for name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.lessFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('First name must be at least 2 characters long');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few numbers for name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.numFirstName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('First name must be a string');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid lasttName', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.invalidLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep
          .equal('Last name cannot contain number or special characters');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid Last name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.firstNumLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('Last name cannot contain number or special characters');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing lasttName field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.missingLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Last name is required');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few characters for name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.lessLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('Last name must be at least 2 characters long');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few numbers for name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.numLastName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Last name must be a string');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid UserName', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.invalidUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name must contain only alpha-numeric characters');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with an invalid User name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.firstNumUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name cannot begin with a number');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing userName field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.missingUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name is required');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few characters for name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.lessUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name must be at least 2 characters long');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with a few numbers for name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.numUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name must be a string');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.invalidEmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('email must be a valid email');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing email field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.missingEmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('email is required');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup  with invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.invalidPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep
          .equal('Password must be at least 8 characters with at least a number, Upper and lower cases special character');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing password field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.missingPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('password is required');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with invalid confirm password type', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.numConfirmPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Confirm password must be a string');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with missing confirm', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.missingConfirm)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Confirm password is required');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should return error if user tries to signup with when passwords do not match', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.unmatchedPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Passwords must much');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Should successfully register user upon correct validation', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.validUser)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'data');
        expect(res.body.message).to.deep.equal('User created. Please, Check your email for a verification link');
        expect(res.body.data).to.have.keys('id', 'firstName', 'lastName', 'userName', 'email', 'role');
        done();
      });
  });
});
describe('POST /api/v1/users', () => {
  it('Sould return error if user tries to signup with an existing email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.existingEmail)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(409);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Email hareraloston@gmail.com already exists');
        done();
      });
  });
});

describe('POST /api/v1/users', () => {
  it('Sould return error if user tries to signup with an existing userName', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(dummyUser.existingUserName)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(409);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('userName Kadhut already taken');
        done();
      });
  });
});
// Test for user reset password
describe('POST /api/v1/users/send-email', () => {
  it('Should send email to the user with an existing Email', (done) => {
    chai.request(app)
      .post('/api/v1/users/send-email')
      .send(dummyUser.emailForSend)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Email sent, please check your email');
        done();
      });
  });
});
describe('POST /api/v1/users/send-email', () => {
  it('Should not send email to the user if Email does no exist', (done) => {
    chai.request(app)
      .post('/api/v1/users/send-email')
      .send(dummyUser.unexestingEmailForSend)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User with email: hareraloston1@gmail.com not found..');
        done();
      });
  });
});
describe('POST /api/v1/users/send-email', () => {
  it('Should not send email to the user if Email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/users/send-email')
      .send(dummyUser.invalidEmailForSend)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('email must be a valid email');
        done();
      });
  });
});
describe('POST /api/v1/users/reset-password/:token', () => {
  it('Should reset password of the user up on valid data', (done) => {
    chai.request(app)
      .post(`/api/v1/users/reset-password/${userToken}`)
      .send(dummyUser.resetPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('You have reset your password Successfully!');
        done();
      });
  });
});
describe('POST /api/v1/reset-password/:token', () => {
  it('Should not reset password of the user if token is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/users/reset-password/DQyMn0.spxg5wNgLosMvKOTsqNpoTnzitdxvBD7y9-fbC1elpc')
      .send(dummyUser.resetPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(403);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('jwt malformed');
        done();
      });
  });
});
describe('POST /api/v1/users/reset-password/:token', () => {
  it('Should return error if user tries to reset password with invalid password', (done) => {
    chai.request(app)
      .post(`/api/v1/users/reset-password/${userToken}`)
      .send(dummyUser.invalidResetPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep
          .equal('Password must be at least 8 characters with at least a number, Upper and lower cases special character');
        done();
      });
  });
});
describe('POST /api/v1/users/reset-password/:token', () => {
  it('Should return error if user tries to reset password without password', (done) => {
    chai.request(app)
      .post(`/api/v1/users/reset-password/${userToken}`)
      .send(dummyUser.resetMissingPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('password is required');
        done();
      });
  });
});
describe('POST /api/v1/users/reset-password/:token', () => {
  it('Should return error if user tries to reset password password not matching', (done) => {
    chai.request(app)
      .post(`/api/v1/users/reset-password/${userToken}`)
      .send(dummyUser.resetPasswordUnmatch)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Passwords must much');
        done();
      });
  });
});
describe('POST /api/v1/users/reset-password/:token', () => {
  it('Should return error if user tries to reset password without confirmin password', (done) => {
    chai.request(app)
      .post(`/api/v1/users/reset-password/${userToken}`)
      .send(dummyUser.resetMissingConfirmPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Confirm password is required');
        done();
      });
  });
});
describe('POST /api/v1/users/reset-password/:token', () => {
  it('Should return error if user tries to reset password with Invalid confirmin password', (done) => {
    chai.request(app)
      .post(`/api/v1/users/reset-password/${userToken}`)
      .send(dummyUser.numresetConfirmPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Confirm password must be a string');
        done();
      });
  });
});
// Login Tests
describe('POST /api/v1/users/login', () => {
  before(async () => {
    const { password } = dummyUser.newUserLogin;
    dummyUser.newUserLogin.password = hashedPassword(password);
    await User.create(dummyUser.newUserLogin);
  });
  it('Should return with user information when correct credentials are supplied and account is verified', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'carlosGga@gmail12.com',
        password: 'Jamal1230!',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('message', 'data');
        // expect(res.body.error).to.deep.equal('message');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.keys('token', 'username', 'email');
        expect(res.body.data).to.have.property('token').to.be.a('string');
        expect(res.body.message).to.deep.equal('Welcome, you are successfully logged in');
        done();
      });
  });
  it('Should not login the user when they are blocked', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'cypg@gmail.com',
        password: 'kangaWu-j00p!b0L',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).have.status(401);
        expect(res).to.be.an('object');
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Your account was blocked');
        done();
      });
  });
});
describe('POST /api/v1/users/login', () => {
  it('Should return error message when user introduces undefined field', () => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'hareraloston@gmail.com',
        password: 'Jamal.123',
        status: 'done'
      })
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('status is not allowed');
      });
  });
  it('Should output error if user provides no email', () => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: '',
        password: 'Jamal1230!'
      })
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('email is not allowed to be empty');
      });
  });
  it('Should output error if user provides no password', () => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'jamal@gmail12.com',
        password: ''
      })
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('password is not allowed to be empty');
      });
  });

  it('Should output error message when password provided is incorrect', () => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'jamal@gmail12.com',
        password: 'Jamal12301'
      })
      .end((err, res) => {
        expect(res).have.status(401);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Incorrect email or password');
      });
  });

  it('Should output error message when email provided is incorrect', () => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'jamalmoh@gmail12.com',
        password: 'Jamal1230'
      })
      .end((err, res) => {
        expect(res).have.status(401);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Incorrect email or password');
      });
  });
  it('Should return error message when user account is not verified', () => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'hareraloston@gmail.com',
        password: 'Jamal.123',
      })
      .end((err, res) => {
        expect(res).have.status(401);
        expect(res.body).to.have.key('error');
        expect(res.body.error).to.deep.equal('Please verify your account first. Visit your email to verify');
      });
  });
});
// Test for folow and unfollow each other
describe('POST /api/v1/profiles/:userName/follow', () => {
  it('User Should follow other user', (done) => {
    chai.request(app)
      .post('/api/v1/profiles/carlosGga/follow')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('data');
        expect(res.body.data).to.have.keys('id', 'follower', 'following', 'updatedAt', 'createdAt');
        done();
      });
  });
});
describe('POST /api/v1/profiles/:userName/follow', () => {
  it('User Should follow other user', (done) => {
    chai.request(app)
      .post('/api/v1/profiles/Kaduzichi/follow')
      .set('Authorization', userToken2)
      .end((err, res) => {
        expect(res).have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('data');
        expect(res.body.data).to.have.keys('id', 'follower', 'following', 'updatedAt', 'createdAt');
        done();
      });
  });
});
describe('GET /api/v1/profiles/:userName/following', () => {
  it('User Should see the list of whom he follows', (done) => {
    chai.request(app)
      .get('/api/v1/profiles/ricky/following')
      .set('Authorization', userToken2)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.keys('id', 'username');
        done();
      });
  });
});
describe('GET /api/v1/profiles/:userName/followers', () => {
  it('User Should see the list of whom follows him', (done) => {
    chai.request(app)
      .get('/api/v1/profiles/Kaduzichi/followers')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.keys('id', 'username');
        done();
      });
  });
});
describe('DELETE /api/v1/profiles/:userName/unfollow', () => {
  it('User Should be able to unfollow each other', (done) => {
    chai.request(app)
      .delete('/api/v1/profiles/carlosGga/unfollow')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('You are no longer following carlosGga');
        done();
      });
  });
});
describe('POST /api/v1/profiles/:userName/follow', () => {
  it('User Should not be able to follow user that does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/profiles/Kaduzichi12/follow')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name Kaduzichi12 does not exist');
        done();
      });
  });
});
describe('POST /api/v1/profiles/:userName/follow', () => {
  it('User Should not be able to follow himself', (done) => {
    chai.request(app)
      .post('/api/v1/profiles/ricky/follow')
      .set('Authorization', userToken2)
      .end((err, res) => {
        expect(res).have.status(403);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('You can not follow yourself');
        done();
      });
  });
});
describe('DELETE /api/v1/profiles/:userName/unfollow', () => {
  it('User Should not be able to unfollow user that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/profiles/Kaduzichi12/unfollow')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name Kaduzichi12 does not exist');
        done();
      });
  });
});
describe('Get /api/v1/profiles/:userName/following', () => {
  it('User Should not be able to see the list of who follow a user that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/profiles/Kaduzichi12/following')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name Kaduzichi12 does not exist');
        done();
      });
  });
});
describe('Get /api/v1/profiles/:userName/followers', () => {
  it('User Should not be able to see the list of who follow a user that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/profiles/Kaduzichi12/followers')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('User name Kaduzichi12 does not exist');
        done();
      });
  });
});

describe('POST /api/v1/users/signup', () => {
  it('Should successfuly create a user through the admin', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .set('Authorization', superAdminToken)
      .send(dummyUser.superCreateAdmin)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'data');
        expect(res.body.data).to.have.keys('id', 'firstName', 'lastName', 'email', 'userName', 'role');
        done();
      });
  });
});

describe('POST /api/v1/users/signup', () => {
  it('Should return error if super-admin provides wrong user role', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .set('Authorization', superAdminToken)
      .send(dummyUser.superCreateWrongRole)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('role must be either user or admin');
        done();
      });
  });
});

describe('PATCH /api/v1/users/:username', () => {
  it('Should successfuly update userRole', (done) => {
    chai.request(app)
      .patch('/api/v1/users/sudi')
      .set('Authorization', superAdminToken)
      .send(dummyUser.updateUserRole)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'data');
        expect(res.body.message).to.deep.equal('User role successfully updated');
        expect(res.body.data).to.have.keys('id', 'Username', 'email', 'bio', 'role');
        done();
      });
  });
});

describe('PATCH /api/v1/users/:username', () => {
  it('Should return error if role is missing', (done) => {
    chai.request(app)
      .patch('/api/v1/users/sudi')
      .set('Authorization', superAdminToken)
      .send(dummyUser.updateRoleMissing)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Role is required');
        done();
      });
  });
});

describe('PATCH /api/v1/users/:username', () => {
  it('Should return error if role is missing', (done) => {
    chai.request(app)
      .patch('/api/v1/users/sudi')
      .set('Authorization', superAdminToken)
      .send(dummyUser.updateInvalidRole)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('Role must be either user or admin');
        done();
      });
  });
});

describe('PATCH /api/v1/users/:username', () => {
  it('Should return error if user updates with too many fields provided ', (done) => {
    chai.request(app)
      .patch('/api/v1/users/sudi')
      .set('Authorization', superAdminToken)
      .send(dummyUser.updateManyFields)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('verified is not allowed');
        done();
      });
  });
});

describe('PATCH /api/v1/users/:username', () => {
  it('Should return error if not super-admin tries to change role', (done) => {
    chai.request(app)
      .patch('/api/v1/users/sudi')
      .set('Authorization', userToken)
      .send(dummyUser.updateUserRole)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('You do not have enough priveledges to continue');
        done();
      });
  });
});

describe('PUT /api/v1/profile/:username', () => {
  it('Should return error if not super-admin tries to change role', (done) => {
    chai.request(app)
      .put('/api/v1/profiles/sudi')
      .set('Authorization', adminToken)
      .send(dummyUser.updateProfileNotAllowed)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('Sorry! You cannot edit the profile that is not yours');
        done();
      });
  });
});

describe('DELETE /api/v1/users/:username', () => {
  it('Should return error admin tries to delete follow admin', (done) => {
    chai.request(app)
      .delete('/api/v1/users/sudi')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('You do not have permission to perform this action');
        done();
      });
  });
});

describe('DELETE /api/v1/users/:username', () => {
  it('Should return error when tries to delete an non existing user', (done) => {
    chai.request(app)
      .delete('/api/v1/users/sudir')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('User with username sudir not found');
        done();
      });
  });
});

describe('DELETE /api/v1/users/:username', () => {
  it('Should return error when user tries to delete a user', (done) => {
    chai.request(app)
      .delete('/api/v1/users/ricky')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error)
          .to.deep.equal('You do not have permission to perform this action');
        done();
      });
  });
});

describe('DELETE /api/v1/users/:username', () => {
  it('Should successfully delete a user', (done) => {
    chai.request(app)
      .delete('/api/v1/users/sudi')
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message)
          .to.deep.equal('User sudi successfully deleted');
        done();
      });
  });
});

describe('Block and unblock a user', () => {
  it('Should block a user', (done) => {
    chai.request(app)
      .put('/api/v1/users/kate/block')
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'blockedUser');
        expect(res.body.message).to.deep.equal('User blocked');
        expect(res.body.blockedUser).to.be.an('object');
        done();
      });
  });
  it('Should not block a user when they are already blocked', (done) => {
    chai.request(app)
      .put('/api/v1/users/cypg/block')
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('The user is already blocked');
        done();
      });
  });
  it('Should not block a user when they do not exist', (done) => {
    chai.request(app)
      .put('/api/v1/users/someone/block')
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('User not found');
        done();
      });
  });
  it('Should unblock a user', (done) => {
    chai.request(app)
      .put('/api/v1/users/kate/unblock')
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message', 'unblockedUser');
        expect(res.body.message).to.deep.equal('User unblocked');
        expect(res.body.unblockedUser).to.be.an('object');
        done();
      });
  });
  it('Should not unblock a user twice', (done) => {
    chai.request(app)
      .put('/api/v1/users/kate/unblock')
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('User not found in the blocked users');
        done();
      });
  });
});
