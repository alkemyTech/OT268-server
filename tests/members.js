const models = require('../models');
const { Members } = models
const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
//const {describe} = mocha;

chai.use(chaiHttp);

const membersForTesting = [{
    name: 'testing one',
    facebookUrl: 'https:facebook.com/testingOne',
    instagramUrl: 'https:instagram.com/testingOne',
    linkedinUrl: 'https:linkedin.com/in/testingOne',
    image: 'https:image.com/testingOne',
    description: 'testing ones description'
},{
    name: 'testing two',
    facebookUrl: 'https:facebook.com/testingTwo',
    instagramUrl: 'https:instagram.com/testingTwo',
    linkedinUrl: 'https:linkedin.com/in/testingTwo',
    image: 'https:image.com/testingTwo',
    description: 'testing twos description'
}]

membersForTesting.forEach(async e => {
    await Members.create(e)

})

  describe('/GET members', () => {
      it('it should GET all the members', (done) => {
            chai.request(server)
            .get('/members')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
    it('it should GET an error when passed a wrong id', (done) =>{
        chai.request(server)
        .get('/members/93843')
        .end((err, res) =>{
            res.should.have.status(404);
            res.body.should.be.a('object');
        done();
        });
    it('it should GET one member when passed a valid id', (done) =>{
        chai.request(server)
        .get('members/1')
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.length.should.be.eql(1);
        done();
        });
    })
  });
});

