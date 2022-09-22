
const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();


chai.use(chaiHttp);

let adminToken, regularToken = null;

before((done) => {
  chai.request(server)
      .post("/auth/login")
      .send({
          'email': 'test2@test.com',
          'password': '12345',
      })
      .end((err, res) => {
        console.log("******Login",res.body);
        adminToken = res.body.token;
        res.should.have.status(200);
        done();
  });
}); 

describe("/GET contacts", () => {
  it("it should GET all the contact", (done) => {
    chai
      .request(server)
      .get("/contacts")
      .set('token', adminToken)
      //.auth(adminToken, { type: 'bearer' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("/POST contacts", () => {

  it("it should POST a contact ", (done) => {
    let contact = {
      "name": "Juan",
      "phone": "035469999999",
      "email": "juan@gmail.com",
      "message": "Hola, me gusta mucho la ONG!",
    };
    chai
      .request(server)
      .post("/contacts")
      .set('Content-Type', 'application/json')
      .send({ name: "Juan",
      phone: "035469999999",
      email: "juan1@gmail.com",
      message: "Hola, me gusta mucho la ONG!"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

