const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const users = require('../data/users.json');
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require('../helpers/jwt');
require("dotenv").config();


beforeAll(async () => {

    for (const el of users) {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        el.password = await hashPassword(el.password);
    }


    await sequelize.queryInterface.bulkInsert("Users", users, {});

    const payload = {
        UserId: 1,
        email: "imam@gmail.com",
        premium: true
      };
      
    global.access_token = signToken(payload);
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
});

let order_id;
let token;


describe("Controller.prompting Integration Test", () => {
  it("should return text with status 403 for a Forbidden Request", async () => {
    const response = await request(app).get("/subs");
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Forbidden")
    );
  });
});


describe("Controller.prompting Integration Test", () => {
    it("should return text with status 200 for a valid request", async () => {
      const response = await request(app).get("/subs").set('Authorization', `Bearer ${global.access_token}`);

      order_id = response.order_id
      token = response.token
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
    });
  });
  