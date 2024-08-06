const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY
const signToken = (payload) => {
  const access_token = jwt.sign(payload, secretKey );
  return access_token;
};

const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}
module.exports = {
    signToken,
    verifyToken
}
