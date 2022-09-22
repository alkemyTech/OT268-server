const expect = require("chai").expect;
const chai = require("chai");

const app = require("../app")
const request = require("supertest")(app);

describe("POST /activities", function () {
  let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJlbWFpbCI6ImFkbWluQHRlc3QxLmNvbSIsInVzZXJfcm9sZUlkIjoxLCJpYXQiOjE2NjM4MjAyNzMsImV4cCI6MTY2NDA2MDI3M30.8WhKA55r8a-91yk3AjI17MGMEjhUfyNm3dYlnZ1py4k';
  let regularToken = '';
  let newId;
  const NOT_EXISTING_ID = 0;

  // before( async function () {
  //     const responseAdmin = await request
  //     .post("/auth/login")
  //     .send({
  //         'email': 'admin@test1.com',
  //         'password': '1234',
  //     });
  //     const adminToken = responseAdmin.body.token;
  //     console.log(adminToken)
  //     const responseRegular = await request
  //     .post("/auth/login")
  //     .send({
  //         'email': 'regular@test1.com',
  //         'password': '1234',
  //     });
  //     regularToken = responseRegular.body.token;
  //     console.log(responseRegular)
  // });

  
  it('create a activities, successful with admin credentials', async function () {
  // before( async function () {
  //     const responseAdmin = await request
  //     .post("/auth/login")
  //     .send({
  //         'email': 'admin@test1.com',
  //         'password': '1234',
  //     });
  //     const adminToken = responseAdmin.body.token;
  //     console.log(adminToken)
  //     const responseRegular = await request
  //     .post("/auth/login")
  //     .send({
  //         'email': 'regular@test1.com',
  //         'password': '1234',
  //     });
  //     regularToken = responseRegular.body.token;
  //     console.log(responseRegular)
  // });
    const response = await request
    .post('/activities')
    .set({ "Authorization": `token ${adminToken}` })
    //.send({name: "activities",content: "content", image: "https://via.placeholder.com/600/92c952" })
    .send({
      'name': 'namemocha',
      'content': 'content',
      'image': 'image',
    });
    respuesta = response.body;
    console.log(respuesta)
    expect(response.status).to.eql(200);
  })

  it('create a activities, successful with regular credentials', async function () {
    const response = await request
    .post('/activities')
    .set('Authorization', `Bearer ${regularToken}`)
    .send({name: "activities",content: "content", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(500)
  })

  it('create a activities, successful without admin credentials', async function () {
    const response = await request
    .post('/activities')
    .send({name: "activities",content: "content", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(500);
  })

})

describe("GET /activities", function () {

  it("returns all activity should succeed with admin credentials", async function () {
    const response = await request
    .get('/activities')
    expect(response.status).to.eql(200);
  });

})

describe("UPDATE /activities/:id", function () {
  let activityId = null;
  it('return update a activity should succeed with admin credentials', async function () {
    const response = await request
    .put(`/activities/${activityId}`)
    .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJlbWFpbCI6ImFkbWluQHRlc3QxLmNvbSIsInVzZXJfcm9sZUlkIjoxLCJpYXQiOjE2NjM3Nzk5NTMsImV4cCI6MTY2NDAxOTk1M30.z_I313u_4kYPabG7n5yjCYp7Il7qjvLChTlBSUJ4Ho0`)
    .send({
      'name': 'namemocha',
      'content': 'content',
      'image': 'image',
    });
        
    expect(response.status).to.eql(200);
  });  
})

describe("DELETE /activities/:id", function () {
  
  let activityId = null;

  it('return delete a activity should succeed with admin credentials', async function () {
    const response = await request
    .del(`/activities/${activityId}`)
    .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJlbWFpbCI6ImFkbWluQHRlc3QxLmNvbSIsInVzZXJfcm9sZUlkIjoxLCJpYXQiOjE2NjM3Nzk5NTMsImV4cCI6MTY2NDAxOTk1M30.z_I313u_4kYPabG7n5yjCYp7Il7qjvLChTlBSUJ4Ho0`)
        
    expect(response.status).to.eql(200);
  });


});