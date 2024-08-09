const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const users = require('../data/users.json');
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require('../helpers/jwt');
require("dotenv").config();

describe("Controller.prompting Integration Test", () => {
  it("should return text with status 200 for a valid request", async () => {
    process.env.GROQ_API_KEY =
      "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";
    const response = await request(app).post("/music").send({
      title: "",
      singer: "Drake",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("text");
    expect(typeof response.body.text).toBe("string");
  });
});


describe("Controller.prompting Integration Test", () => {
  it("should return error with status 401 for an invalid API key", async () => {

    process.env.GROQ_API_KEY = "gsk_8cKZk0lUziCGZl2wEJblWasd";
    

    const response = await request(app)
      .post("/music")
      .send({
        title: "",
        singer: "Drake",
      });
    

    console.log('Response:', response.body);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveProperty("message");
    expect(response.body.error.message).toBe("Invalid API Key");
  });
});


