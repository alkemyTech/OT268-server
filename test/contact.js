const db = require('../models/index');
const  Contact  = db.models.Contact;
const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
//const {describe} = mocha;

chai.use(chaiHttp);


describe("/GET contact", () => {
  it("it should GET all the contact", (done) => {
    chai
      .request(server)
      .get("/contact")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("/POST contact", () => {

  it("it should POST a contect ", (done) => {
    let contact = {
      name: "Juan",
      phone: "035469999999",
      email: "juan@gmail.com",
      message: "Hola, me gusta mucho la ONG!",
    };
    chai
      .request(server)
      .post("/contact")
      .send({ newContact: contact })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");

        done();
      });
  });
});

