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

const comparePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    hashPassword,
    comparePassword
};
