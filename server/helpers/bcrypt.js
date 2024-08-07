const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
};

function comparePassword(inputPassword, storedPasswordHash) {
    return bcrypt.compareSync(inputPassword, storedPasswordHash);
  }

module.exports = {
    hashPassword,
    comparePassword
};
