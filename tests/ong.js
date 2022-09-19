const models = require("../models");
const { Organizations } = models;
const chai = require("chai");
const mocha = require("mocha");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();


chai.use(chaiHttp);


describe("/GET ong", () => {
  it("it should GET all the members", (done) => {
    chai
      .request(server)
      .get("/organizations")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("/POST ong", () => {

  it("it should POST a member ", (done) => {
    let member = {
      name: "Francisco",
      image:
        "https://img.freepik.com/foto-gratis/joven-confiado_1098-20868.jpg?w=2000",
      address: "Paraguay 552, Caba, Argentina",
      phone: "01124654687",
      email: "fracisco17@gmail.com",
      welcomeText: "Hola, mi nombre es Francisco, mucho gusto!",
      aboutUsText: "Soy argentino y vivo en Buenos Aires",
    };
    chai
      .request(server)
      .post("/organizations/public")
      .send({ newMember: member })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");

        done();
      });
  });
});

describe("/PUT/:id ong", () => {
  it("it should UPDATE a member given the id", async () => {
    const member = await Organizations.create({
      name: "Francisco",
      image:
        "https://img.freepik.com/foto-gratis/joven-confiado_1098-20868.jpg?w=2000",
      address: "Paraguay 552, Caba, Argentina",
      phone: "01124654687",
      email: "fracisco17@gmail.com",
      welcomeText: "Hola, mi nombre es Francisco, mucho gusto!",
      aboutUsText: "Soy argentino y vivo en Buenos Aires",
    });
    chai
      .request(server)
      .put("/organizations/public" + member.id)
      .send({
        newValues: {
            name: "Matias",
            image:
              "https://img.freepik.com/foto-gratis/joven-confiado_1098-20868.jpg?w=2000",
            address: "Brasil 850, Caba, Argentina",
            phone: "01148655564",
            email: "matias5@gmail.com",
            welcomeText: "Hola, mi nombre es Matias, mucho gusto!",
            aboutUsText: "Soy uruguayo y vivo en Buenos Aires",
        },
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("new name");
        done();
      });
  });
  it("should throw an error if not id is passed", (done) => {
    chai
      .request(server)
      .put("/organizations/public/NaN")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("ok").eql(false);
        res.body.should.have
          .property("error")
          .eql("missing data. Check documentation");
        done();
      });
  });
  it("should throw an error if no new data is passed", (done) => {
    chai
      .request(server)
      .put("/authorization/public/1")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("ok").eql(false);
        res.body.should.have
          .property("error")
          .eql("missing data. Check documentation");
        done();
      });
  });
});
    
describe('/DELETE/:id ong', () => {
    it('it should DELETE a ong given the id', async () => {
        let organization = await Organizations.create({
          id: 2,
          name: "Francisco",
          image:
            "https://img.freepik.com/foto-gratis/joven-confiado_1098-20868.jpg?w=2000",
          address: "Paraguay 552, Caba, Argentina",
          phone: "01124654687",
          email: "fracisco17@gmail.com",
          welcomeText: "Hola, mi nombre es Francisco, mucho gusto!",
          aboutUsText: "Soy argentino y vivo en Buenos Aires",})
            organization.save((err, organization) => {
              chai.request(server)
              .delete('/authorization/public' + organization.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').eql(true);
              });
        });
    });
    it('it should throw an error when given an invalid id', (done)=> {
        chai.request(server)
        .delete('/authorization/public/NaN')
        .end((err, res) => {
              res.should.have.status(400);
          done();
        });
    })
});
