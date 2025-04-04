


// // // const express = require('express');
// // // const bcrypt = require('bcryptjs');
// // // const jwt = require('jsonwebtoken');
// // // const User = require('../models/User');
// // // const router = express.Router();

// // // // Register Route
// // // router.post('/register', async (req, res) => {

// // //  console.log('Register request received:', req.body);  // Log when the register route is hit

// // //   const { username, email, password } = req.body;
// // //   try {
// // //     let user = await User.findOne({ email });
// // //     if (user) {
// // //       return res.status(400).json({ message: 'User already exists' });
// // //     }

// // //     // Hash the password before saving
// // //     const salt = await bcrypt.genSalt(10);
// // //     const hashedPassword = await bcrypt.hash(password, salt);

// // //     user = new User({ username, email, password: hashedPassword });


// // //       console.log('User object before saving:', user);  // Log the user object before saving to DB
  
// // //     await user.save();

// // //     // Generate a token
// // //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// // //     res.status(201).json({ message: 'User registered successfully', token });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server Error' });
// // //   }
// // // });

// // // // // Login Route
// // // // router.post('/login', async (req, res) => {
// // // //   const { email, password } = req.body;
// // // //   try {
// // // //     let user = await User.findOne({ email });
// // // //     if (!user) {
// // // //       return res.status(400).json({ message: 'Invalid credentials' });
// // // //     }

// // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // //     if (!isMatch) {
// // // //       return res.status(400).json({ message: 'Invalid credentials' });
// // // //     }

// // // //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// // // //     res.json({ token });
// // // //   } catch (err) {
// // // //     res.status(500).json({ message: 'Server Error' });
// // // //   }
// // // // });






// // // // Login Route
// // // router.post('/login', async (req, res) => {
// // //   const { email, password } = req.body;
// // //   console.log("Login attempt with email:", email);  // Log the email to check
// // //   try {
// // //     let user = await User.findOne({ email });
// // //     if (!user) {
// // //       console.log("User not found");
// // //       return res.status(400).json({ message: 'Invalid credentials' });
// // //     }

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) {
// // //       console.log("Password mismatch");
// // //       return res.status(400).json({ message: 'Invalid credentials' });
// // //     }

// // //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // //     console.log("Token generated:", token);  // Log the token to check
// // //     res.json({ token });
// // //   } catch (err) {
// // //     console.log("Error in login:", err);  // Log any error that occurs
// // //     res.status(500).json({ message: 'Server Error' });
// // //   }
// // // });









// // // // auth.js (Backend)
// // // router.get('/logout', (req, res) => {
// // //   // Clear the token from the client's side
// // //   // res.status(200).json({ message: 'Logged out successfully' });
// // //     // Clear session or token data if needed
// // //   res.clearCookie('auth-token'); // if you're using cookies
// // //    res.json({ message: 'Logged out successfully' });
// // //   res.redirect('/login'); // Redirect to the login page
// // // });
// // // // window.location.href = '/login';  // Redirect to login page


// // // // res.redirect('/login'); // This will redirect the client to the login page from the se

// // // module.exports = router;















const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  console.log('Register request received:', req.body);
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("Token generated:", token);
    res.json({ token });
  } catch (err) {
    console.log("Error in login:", err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;








// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// // Register Route
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     // Hash Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Save User
//     user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Generate Token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ token, userId: user._id, name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;


// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// // Middleware for verifying JWT token
// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

// // Get Logged-in User Route
// router.get("/user", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user details" });
//   }
// });

// module.exports = router;

