const expect = require("chai").expect;
const chai = require("chai");

const app = require("../app")
const request = require("supertest")(app);


let adminToken
const baseRequest = {name: "Activity 1", content: "activity content", image: "https://picsum.photos/200"}

before( async () =>{
  const responseAdmin = await request
  .post("/auth/login")
  .send({
    'email': 'admin@test1.com',
    'password': '1234',
  });
  adminToken = responseAdmin.body.token;
  console.log(adminToken)
});

describe("POST /activities",  function () {  
  

  it('activities POST with ', async () => {
    let response = await request    
    .post("/activities")
    .set('Token', adminToken)
    .set('content-type', 'application/x-www-form-urlencoded')
    .type('form')
    .send(baseRequest)
    respuesta = response.body
    console.log(respuesta)
    expect(response.status).to.eql(200);
    expect(response.body);
  });
  it('activities POST without token', async () => {
    const response = await request    
    .post("/activities")
    .send(baseRequest)
    expect(response.status).to.eql(500);
  });
    
})

describe("GET /activities", () => {  

  it('activities GET', async () => {
    let response = await request    
    .get('activities/all')
    .set('Accept', 'application/json')
    expect(response.status).to.eql(200);
  });
})

// describe("UPDATE /activities", () => {  

//   it('activities UPDATE', async () => {
//     let response = await request    
//     .update('activities')
//     expect(200);
//   });
// })
// describe("DELETE /activities", () => {  

//   it('activities DELETE', async () => {
//     let response = await request    
//     .delete('activities')
//     expect(200);
//   });
// })