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
