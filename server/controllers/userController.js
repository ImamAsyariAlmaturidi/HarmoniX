const { User } = require('../models/index');
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require('google-auth-library');

class Controller {
  static async registerUser(req, res, next) {
    const { firstName, lastName, phone, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

 
      await User.create({
        firstName,
        lastName,
        phone,
        email,
        password
      });

      res.status(201).json({
        msg: 'User created successfully',
      });
    } catch (error) {
     
      console.error('Error during registration:', error);
      next(error);
    }
  }

  static async loginOrRegisterUser(req, res, next) {
    try {
      const token = req.headers.token;

      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }

      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: "password_google",
          firstName: payload.given_name,
          lastName: payload.family_name,
          phone: payload.phone_number || 'N/A',
        },
        hooks: false
      });

      const access_token = signToken({
        UserId: user.id,
        email: user.email,
        premium: user.premium
      });

      console.log(token)

      res.status(200).json({ access_token, premium: user.premium });
    } catch (error) {

      if (error.response && error.response.error) {
   
        next({ status: 400, message: 'Invalid Google token' });
      } else {
    
        next(error);
      }
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw { name: "InvalidLogin" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "LoginError" };
      }

      if (!comparePassword(password, user.password)) {
        throw { name: "LoginError" };
      }

      const payload = {
        UserId: user.id,
        email: user.email,
        premium: user.premium,
      };
      const access_token = signToken(payload);
      const response = {
        access_token,
        premium: user.premium,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
