import User from "../models/User.js";

import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";

/*
    REGISTER USER
*/

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // Check existing user

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // Create user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token

    const token = generateToken(user);

    res.status(201).json({
      success: true,

      token,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/*
    LOGIN USER
*/

export const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    // Compare password

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,

        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,

      token,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};