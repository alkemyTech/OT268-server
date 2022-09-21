const expect = require("chai").expect;

const app = require("../app")
const request = require("supertest")(app);



let adminToken, regularToken = null;
const baseRequest = { name: "News 1", content: "News content", image: "https://via.placeholder.com/600/92c952",categoryId: 1 }

before(async () => {
    const responseAdmin = await request
        .post("/auth/login")
        .send({
            'email': 'admin@test1.com',
            'password': '1234',
        });
    adminToken = responseAdmin.body.token;

    const responseRegular = await request
        .post("/auth/login")
        .send({
            'email': 'regular@test1.com',
            'password': '1234',
        });
    regularToken = responseRegular.body.token;
});

describe("GET /news", function () {

    it("returns all news should fail without credentials", async function () {
        const response = await request
            .get("/news");

        expect(response.status).to.eql(500);
    });

});

describe("POST /news", function () {

    it('return insert a news should succeed with admin credentials', async () => {
        const response = await request
            .post('/news')
            .set("Authorization", `Bearer ${adminToken}`)
            .send(baseRequest)
            
        console.log(response)
    });

});

describe("UPDATE /news/:id", function () {

    it('return update a news should fail without credentials', async function () {
        const response = await request
            .put(`/news/${newsId}`)
            .send({
                content: "content news"
            });
        expect(response.status).to.eql(500);
    });

    it('return update a news should fail with admin credentials and id not found', async function () {
        const response = await request
            .put('/news/0')
            .set("Authorization", `Bearer ${adminToken}`)
            .send(baseRequest);
        expect(response.status).to.eql(500);
    });

});

describe("DELETE /news/:id", function () {

    it('return delete a news should fail without credentials', async function () {
        const response = await request
            .del(`/news/${newsId}`)

        expect(response.status).to.eql(500);
    });

    it('return delete a news should fail with admin credentials and id not found', async function () {
        const response = await request
            .put('/news/0')
            .set("Authorization", `Bearer ${adminToken}`)
            .send(baseRequest);
        expect(response.status).to.eql(500);
    });

});