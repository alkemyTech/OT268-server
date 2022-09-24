const expect = require("chai").expect;
const chai = require("chai");

const app = require("../app")
const request = require("supertest")(app);


let adminToken
const baseRequest = { name: "Activity 1", content: "activity content", image: "https://picsum.photos/200", categoryId: 3 }
let newId;

before(async () => {
    const responseAdmin = await request
        .post("/auth/login")
        .send({
            'email': 'admin@test1.com',
            'password': '1234',
        });
    adminToken = responseAdmin.body.token;
    //console.log(adminToken)
});

describe("POST /news", function () {

    it('news POST with ', async () => {
        let response = await request
            .post("/news")
            .set('Token', adminToken)
            .set('content-type', 'application/x-www-form-urlencoded')
            .type('form')
            .send(baseRequest)
        respuesta = response.body
        newId = response.body.id;

        //console.log(respuesta)
        expect(response.status).to.eql(200);
        expect(response.body);
    });
})

describe("GET /news", () => {

    it('news GET', async () => {
        const response = await request
            .get('/news')
            .set('Accept', 'application/json')
        respuesta = response.body
        //console.log(respuesta)
        expect(response.status).to.eql(200)
    });
})

describe("UPDATE /news", () => {
    it('news UPDATE', async () => {

        let response = await request
        .put(`/news/${newId}`)
        .set('Token', adminToken)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        expect(response.status).to.eql(200)
    });

})

describe("DELETE /news", () => {
    it('news DELETE', async () => {
        let response = await request
        .delete(`/news/${newId}`)
        .set('Token', adminToken)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        expect(response.status).to.eql(201);
    });
})