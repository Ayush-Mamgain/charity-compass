//function to return the hashed password without
const bcrypt = require('bcryptjs');

module.exports = async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds, (error, hash) => {
        return error ? error: hash
    });
}