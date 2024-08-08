const request = require('supertest');
const express = require('express');
const Controller = require('../controllers/groqController');
require('dotenv').config();

const app = express();
app.use(express.json());
app.post('/prompting', Controller.prompting);

describe('Controller.prompting Integration Test', () => {
    it('should return text with status 200 for a valid request', async () => {
        process.env.GROQ_API_KEY = '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';
        const response = await request(app)
            .post('/prompting')
            .send({
                title: 'Sample Title',
                singer: 'Sample Singer'
            });

            console.log(response)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('text');
        expect(typeof response.body.text).toBe('string');
    });

    it('should handle errors correctly', async () => {
        process.env.GROQ_API_KEY = 'gawdwda';

        const response = await request(app)
            .post('/prompting')
            .send({
                title: 'Invalid Title',
                singer: 'Invalid Singer'
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({});
    });
});
