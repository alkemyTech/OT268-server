const expect = require("chai").expect;

const app = require("../app")
const request = require("supertest")(app);

module.exports = {
    request,
    expect,
};