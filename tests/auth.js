const models = require('../models');
const { User } = models
const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const bcrypt = require('bcrypt')
//const {describe} = mocha;

chai.use(chaiHttp);

(async function () {
await User.findOrCreate({where: {
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password:  await bcrypt.hash('1234', 10),
        image: 'barfoo'
    }}).catch(err => console.log(err))
})();


  describe('/auth/login POST', () => {
      it('it should return a status code 400 when nothing is sent throgh body', (done) => {
            chai.request(server)
            .post('/auth/login')
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
              done();
            });
      });
      it('it should return an error when no user matches the email sent', (done)=> {
        chai.request(server)
        .post('/auth/login')
        .send({email: 'bar@foo.com', password: '1234'})
        .end((err, res) => {
            res.should.have.status(404);
        done();
        });
      });
      it('it should return a 404 status code if a wrong password is sent', ()=> {
        chai.request(server)
        .post('/auth/login')
        .send({email: 'foo@bar.com', password: '00000'})
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('ok').eql(false);
        //done();
        });
      });
    it('should return a valid JWT when valid credentials are sent', ()=> {
        chai.request(server)
        .post('/auth/login')
        .send({email: 'foo@bar.com', password: '1234'}) 
        .end((err, res) => {                                                                                    
            res.should.have.status(200);
            res.body.should.be.a('object');
        //done();
        });
    })
});

describe('/auth/me GET', () => {
    it('it should not GET authorized when no token is sent', (done) => {
          chai.request(server)
          .get('/auth/me')
          .end((err, res) => {
                res.should.have.status(403);
            done();
          });
    });
    it('it should not GET authorized when an invalid token is sent', (done) => {
          chai.request(server)
          .get('/auth/me')
          .set("Authorization", 'Bearer: ')
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });
    it('it should GET authorized when a valid token is sent', (done) =>{
        chai.request(server)
        .get('/auth/me')
        .set("Authorization", 'eyJhbGciOiJIUzI1NiIsImV4cGlyZXNJbiI6MjQwMDAwfQ.eyJlbWFpbCI6ImZvb0BiYXIuY29tIn0.ID_GAvZ-ALKxN11xxIWVZgragf0Qza7QYXxY_x1qT4g')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('message').eql('foo@bar.com authorized')
          done();
        });
    })
});
