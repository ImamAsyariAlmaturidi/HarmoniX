const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1]
  try {
    if (!accessToken) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { UserId, email, premium } = verifyToken(accessToken);

    const user = await User.findByPk(UserId);

    if (!user) {
      return res.status(401).json({ message: "Please login first" });
    }

    req.loginInfo = {
      UserId,
      email,
      premium
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


module.exports = authentication

