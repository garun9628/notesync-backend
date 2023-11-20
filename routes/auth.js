const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "shhhhh";
// const JWT_SECRET = "shhhhh";

// Route 1: create a user using POST "/api/auth/createuser".
// No login required.
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    // if there are validation errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check whether if user find with this email already present, then return status code 400 with this message.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry user with this email already in use",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      // if user not found then create one.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      let data = {
        user: { id: user.id },
      };
      let authToken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authToken });

      // catch any errors occurred.
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 2: User login using POST "/api/auth/login".
// No login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are validation errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let success = false;
      // check whether if user find with this email already present, then return status code 400 with this message.
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      // we are sending user details(id) in the data, so when we get this data after verification of token then we get the id in data.user
      let data = {
        user: { id: user.id },
      };
      let authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken, user });

      // catch any errors occurred.
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: Get the user details after verifying the user token through fetchuser middleware.
// Login required.
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
