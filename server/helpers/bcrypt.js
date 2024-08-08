const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY
const hashPassword = (password) => {
    try {
        const salt =  bcrypt.genSaltSync(10);
        const hashedPassword =  bcrypt.hashSync(password, salt);
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
