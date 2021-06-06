import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Register a new User
// @route POST /api/users
// @access Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = await req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User Already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if(user){
      res.status(201).json({
        isAdmin: user.isAdmin,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }else{
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    res.status(401);
    res.json({ Error: error.message });
  }
};

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = async (req, res) => {
  try {
    const { email, password } = await req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        isAdmin: user.isAdmin,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      
      throw new Error("Invalid email or passowrd");
    }
  } catch (error) {
    res.status(401);
    res.json(error.message);
  }
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
};
