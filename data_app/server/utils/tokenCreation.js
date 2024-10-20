const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (user) => {
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, 'your_jwt_secret_key');
    return token;
};

module.exports = {
    generateToken
}