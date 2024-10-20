const bcrypt = require('bcryptjs');

// Function to hash password
const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

module.exports = generateHashedPassword;