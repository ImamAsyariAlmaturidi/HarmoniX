const { User } = require('../models/index')
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require('google-auth-library');
class Controller {
    static async registerUser(req, res) {
        const { firstName, lastName, phone, email, password} = req.body 
        try {
            await User.create({
                firstName, lastName, phone, email, password
            })
            res.status(201).json({
                msg: 'create user success',
            })
        } catch (error) {
            res.send(error)
        }
    }

    static async loginOrRegisterUser(req, res) {
        try {
            const { token } = req.headers
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    email: payload.email,
                    password: "password_google"
                },
                hooks: false
            })

            const access_token = signToken({
                id: user.id,
                firstName: user.firstName,
            })

            res.status(200).json({ access_token })
        } catch (err) {
           res.status(500).json(err)
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
          const user = await User.findOne({
            where: {
              email,
            },
          });
    
          if (!user) {
            throw { "name" : "user not found"};
          }
    
          if (!comparePassword(password, user.password)) {
            throw { "name": "invalid email or password" };
          }
    
          const payload = {
            UserId: user.id,
            email: user.email,
            premium: user.premium,
          };
          const access_token = signToken(payload)
          res.status(200).json({
            msg: "Login Succes",
            access_token
          })
        } catch (error) {
          res.send(error)
        }
      }
}

module.exports = Controller