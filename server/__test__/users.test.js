const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const users = require('../data/users.json');
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

let access_token;

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

describe("POST /register", () => {
    it("should register a user successfully", async () => {
        const response = await request(app)
            .post('/register')
            .send({
                firstName: 'Alex',
                lastName: 'Smith',
                phone: '1122334455',
                email: 'alex.smith@example.com',
                password: 'password789'
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ msg: 'User created successfully' });
    });

    it("should return error for duplicate email", async () => {
        const response = await request(app)
            .post('/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                phone: '0987654321',
                email: 'imam@gmail.com', 
                password: 'password456'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Email is already registered' });
    });
});



describe("POST /login", () => {
    describe("POST /login - success", () => {
        it("should return an object with message and token", async () => {
            const response = await request(app)
                .post("/login")
                .send({ email: "imam@gmail.com", password: "imam" });
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("access_token", expect.any(String));
            expect(response.body).toHaveProperty("premium", true);
        });
    });

    describe("POST /login - failed due to empty email", () => {
        it("should return an object with message", async () => {
            const response = await request(app)
                .post("/login")
                .send({ email: "", password: "imam" });
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.stringContaining("Please input email or password"));
        });
    });

    describe("POST /login - failed due to empty password", () => {
        it("should return an object with message", async () => {
            const response = await request(app)
                .post("/login")
                .send({ email: "imam@gmail.com", password: "" });
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.stringContaining("Please input email or password"));
        });
    });

    describe("POST /login - failed due to incorrect email", () => {
        it("should return an object with message", async () => {
            const response = await request(app)
                .post("/login")
                .send({ email: "imam@gmaadwdadwail.com", password: "imam" });
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.stringContaining("Invalid email or password"));
        });
    });

    describe("POST /login - failed due to incorrect password", () => {
        it("should return an object with message", async () => {
            const response = await request(app)
                .post("/login")
                .send({ email: "imam@gmail.com", password: "immmmmmm" });
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.stringContaining("Invalid email or password"));
        });
    });
});
