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
                  res.body.should.be.a('object');
              done();
            });
      });
      it('it should not allow you to request a non integer page number', (done)=> {
        chai.request(server)
        .get('/members?page=NaN')
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql("page parameter has to be an integer");
        done();
        });
      });
      it('it should not allow you to request a page number higher than possible', (done)=> {
        chai.request(server)
        .get('/members?page=152616')
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('ok').eql(false);
        done();
        });
      });
});

describe('/POST member', () => {
    it('it should not POST a member without name field', (done) => {
        let member = {
            name: null,
            facebookUrl: 'https:facebook.com/testingThree',
            instagramUrl: 'https:instagram.com/testingThree',
            linkedinUrl: 'https:linkedin.com/in/testingThree',
            image: 'https:image.com/testingThree',
            description: 'testing threes description'
        }
          chai.request(server)
          .post('/members')
          .send({newMember: member})
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    });
    it('it should POST a member ', (done) => {
        let member = {
            name: 'testing three',
            facebookUrl: 'https:facebook.com/testingThree',
            instagramUrl: 'https:instagram.com/testingThree',
            linkedinUrl: 'https:linkedin.com/in/testingThree',
            image: 'https:image.com/testingThree',
            description: 'testing threes description'
        }
          chai.request(server)
          .post('/members')
          .send({newMember: member})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
            done();
          });
    });
});

describe('/PUT/:id member', () => {
    it('it should UPDATE a member given the id', async () => {
        const member = await Members.create({name: "old name",
            facebookUrl: 'https:facebook.com/testingThree',
            instagramUrl: 'https:instagram.com/testingThree',
            linkedinUrl: 'https:linkedin.com/in/testingThree',
            image: 'https:image.com/testingThree',
            description: 'testing threes description'})
        chai.request(server)
              .put('/members/' + member.id)
              .send({newValues: {
                name: 'new name',
                facebookUrl: 'https:facebook.com/testingThree',
                instagramUrl: 'https:instagram.com/testingThree',
                linkedinUrl: 'https:linkedin.com/in/testingThree',
                image: 'https:image.com/testingThree',
                description: 'testing threes description'
              }})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('new name');
                //done();
              });
        
    });
    it('should throw an error if not id is passed', (done) =>{
        chai.request(server)
                  .put('/members/NaN')
                  .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('ok').eql(false);
                        res.body.should.have.property('error').eql("missing data. Check documentation")
                    done();
                  });
    })
    it('should throw an error if no new data is passed', (done) =>{
        chai.request(server)
                  .put('/members/1')
                  .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('ok').eql(false);
                        res.body.should.have.property('error').eql("missing data. Check documentation")
                    done();
                  });
    })
});
    describe('/DELETE/:id member', () => {
        it('it should DELETE a member given the id', async () => {
            let member = await Members.create({
                name: "old name",
                facebookUrl: 'https:facebook.com/testingThree',
                instagramUrl: 'https:instagram.com/testingThree',
                linkedinUrl: 'https:linkedin.com/in/testingThree',
                image: 'https:image.com/testingThree',
                description: 'testing threes description'})
            member.save((err, member) => {
                  chai.request(server)
                  .delete('/members/' + member.id)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('ok').eql(true);
                  });
            });
        });
        it('it should throw an error when given an invalid id', (done)=> {
            chai.request(server)
            .delete('/members/NaN')
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
        })
    });




