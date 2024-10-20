const express = require("express");
const Data = require("../model/Data");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const generateHashedPassword = require("../utils/passwordCreation");
const {generateToken} = require("../utils/tokenCreation");
const router = express.Router();


// Registration route - save hashed password to the database
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // Check if the user already exists
    console.log("i ma running")
    let user = await User.findOne({ email });
    if (user) return res.status(400).send({success:false,msg:'User already registered.'});

    // Hash the password
    const hashedPassword = await generateHashedPassword(password);

    // Save the user with the hashed password
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.send({success:true,msg:'User registered successfully.'});
    } catch (error) {
        console.log(error);
    }
  
});

// Login route - Verify password and generate JWT token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({success:false,msg:'Invalid email or password.'});

    // Verify the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({success:false,msg:'Invalid email or password.'});

    // Generate JWT token
    const token = generateToken(user);
    res.send({success:true, token });
});

module.exports = router;