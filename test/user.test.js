const db = require('../models/index');
const { User } = db;
const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const { describe } = mocha;

chai.use(chaiHttp);

let adminToken,
  regularToken = null;

before(async () => {
  const responseAdmin = await request.post('/auth/login').send({
    email: 'admin@test1.com',
    password: '1234',
  });
  adminToken = responseAdmin.body.token;

  const responseRegular = await request.post('/auth/login').send({
    email: 'regular@test1.com',
    password: '1234',
  });
  regularToken = responseRegular.body.token;
});

describe('/GET users', () => {
  it('it should GET all the users', (done) => {
    chai
      .request(server)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('Invalid token', (done) => {
    chai
      .request(server)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}123`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('Not provided token', (done) => {
    chai
      .request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('Not admin user', (done) => {
    chai
      .request(server)
      .get('/users')
      .set('Authorization', `Bearer ${regularToken}`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/POST users', () => {
  it('it should POST a user ', (done) => {
    let user = {
      name: 'Juan',
      lastname: 'Perez',
      Image: 'https://via.placeholder.com/600/92c952',
      email: 'juan@juan.com',
      password: '1234',
      role: 'admin',
    };
    chai
      .request(server)
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ newUser: user })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');

        done();
      });
  });

  it('it should not POST a user with a missing field', (done) => {
    let user = {
      lastname: 'Perez',
      Image: 'https://via.placeholder.com/600/92c952',
      email: '',
      password: '1234',
      role: 'admin',
    };
    chai
      .request(server)
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ newUser: user })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('/DELETE/:id user', () => {
  it('it should DELETE a user given the id', (done) => {
    let userId = 1;
    chai
      .request(server)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/PATCH/:id user', () => {
  it('it should PATCH a user given the id', (done) => {
    let userId = 1;
    let user = {
      name: 'Juan',
      lastname: 'Gomez',
      Image: 'https://via.placeholder.com/600/92c952',
      email: 'Juan@gomez.com',
      password: '1234',
      role: 'admin',
    };
    chai
      .request(server)
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ user })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
