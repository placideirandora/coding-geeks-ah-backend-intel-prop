import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

let userToken1;

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
describe('POST /api/v1/users/:role/role', () => {
  it('Should be able to create a permission', (done) => {
    chai.request(app)
      .post('/api/v1/users/admin/permissions')
      .set('Authorization', userToken1)
      .send({
        permission: 'CREATE_ADMIN'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('permission');
        expect(res.body.permission).to.have.keys('id', 'roleId', 'permission', 'updatedAt', 'createdAt');
        done();
      });
  });
  it('Should not be able to create a permission if permission is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/users/admin/permissions')
      .set('Authorization', userToken1)
      .send({
        permission: 'Cre'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Invalid permission');
        done();
      });
  });
  it('Should not be able to create a permission if role is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/users/fakeuser/permissions')
      .set('Authorization', userToken1)
      .send({
        permission: 'CREATE_USER'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('Role must be either user, admin or super-admin');
        done();
      });
  });
  it('Should not be able to create a permission if it is already defined', (done) => {
    chai.request(app)
      .post('/api/v1/users/admin/permissions')
      .set('Authorization', userToken1)
      .send({
        permission: 'CREATE_USER'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('This permission is already defined');
        done();
      });
  });
  it('Should be able to return all permissions of a specific role', (done) => {
    chai.request(app)
      .get('/api/v1/users/admin/permissions')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('permissions');
        expect(res.body.permissions).to.be.an('array');
        expect(res.body.permissions[0]).to.have.keys('id', 'roleId', 'permission', 'updatedAt', 'createdAt');
        done();
      });
  });
  it('Should be able to update a permission', (done) => {
    chai.request(app)
      .patch('/api/v1/users/1/permissions')
      .set('Authorization', userToken1)
      .send({
        permission: 'UPDATE_USER'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('permission');
        expect(res.body.permission).to.have.keys('id', 'roleId', 'permission', 'updatedAt', 'createdAt');
        done();
      });
  });
  it('Should not be able to update a permission if permissionId is not a number', (done) => {
    chai.request(app)
      .patch('/api/v1/users/NaN/permissions')
      .set('Authorization', userToken1)
      .send({
        permission: 'UPDATE_USER'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.deep.equal('permissionId must be a number');
        done();
      });
  });
  it('Should be able to delete permission', (done) => {
    chai.request(app)
      .delete('/api/v1/users/1/permissions')
      .set('Authorization', userToken1)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('message');
        expect(res.body.message).to.deep.equal('Permission deleted successfully');
        done();
      });
  });
});
