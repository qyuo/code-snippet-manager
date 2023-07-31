const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// User registration route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input data ( email, password)
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields." });
    }


    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not register the user." });
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input data (email, password)
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields." });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No account with this email exists." });
    }

    // Check if the password is correct
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // If the login is successful, generate a JWT token
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
    // Send the token back to the client
    res.json({ token });
  } catch {
    res.status(500).json({ error: "Could not log in the user." });
  }
});

module.exports = router;
