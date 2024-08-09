
const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const users = require('../data/users.json');
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require('../helpers/jwt');
require("dotenv").config();


describe("Controller. google login", () => {
    it("should return error", async () => {  
      const response = await request(app)
        .post("/login/google")
        .send({
          email: "",
          password: "Drake",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Token is required' });

    });
  });
  
  describe("Controller. Google Login", () => {
    it("should return success message for valid Google token", async () => {
      // Gunakan token yang valid dari Google OAuth untuk pengujian
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjljNDA5Zjc3YTEwNmZiNjdlZTFhODVkMTY4ZmQyY2ZiN2MwYjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3MTU0NzM4NzI4MTctNHJvc2dpNDNiMGRkcmlmYTBkbGY4dWdnY2ZhajViNm8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3MTU0NzM4NzI4MTctNHJvc2dpNDNiMGRkcmlmYTBkbGY4dWdnY2ZhajViNm8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQxNDQxOTkzMjkzNTE2NDcxNTciLCJlbWFpbCI6ImltYW1hc3lhcmk3MDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcyMzE3NjI2OCwibmFtZSI6ImltYW1yaSBhc3lhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pGOTVyZU9wWVJKSmduM2lLVDdRMVFzQkk0bFo5aWFBeGgyeUsyU0VTUHR2LW5fNW89czk2LWMiLCJnaXZlbl9uYW1lIjoiaW1hbXJpIiwiZmFtaWx5X25hbWUiOiJhc3lhIiwiaWF0IjoxNzIzMTc2NTY4LCJleHAiOjE3MjMxODAxNjgsImp0aSI6IjBmNzdiMmVjOWEzNDUyNzgzNzAwNmRiZDFhNGIxMDE2NTYxMTVjOTcifQ.xwXXLK7kQmQI0v6HMCCxUZbotlIrswev_B44rh2F7fqNcCTrCudrWzDadRIZn6q2lfF4EgoUgO1GqDff-zZYUibGCLLMIpavTowrcGsjTKlsQvZAFDRx2avhpRFmLQPlnAT9L57LubByJL0zv7DFTjZepaOkWQO-MY5DVqTe-4Lw11Rgn5TpQLFlXEDcpnnc_U4JdG3TcLOZYvNctizSSSs75OmjgPkahK21G1H7aNXJbrXyUau8ctDW7dhw-P8IMzlXOODvP1pUCevW9GZ97dKpZzdkeZ_5k0DI3amFsoYIqdLAB8gcLVZ3Mf-aCt4UH7WCMnvoL95-wsCTZKVKBw';
  
      const response = await request(app)
        .post('/login/google')
        .set('Authorization', `Basic ${token}`); 
  
      console.log(response.body); 
  
      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('premium');
    });
  
    it('should return 400 if no token is provided', async () => {
      const response = await request(app)
        .post('/login/google');
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Token is required');
    });
  
    it('should return 400 for invalid Google token', async () => {
      const invalidToken = 'invalid_token';
      const response = await request(app)
        .post('/login/google')
        .set('Authorization', `Bearer ${invalidToken}`);
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Token is required');
    });
  });
  