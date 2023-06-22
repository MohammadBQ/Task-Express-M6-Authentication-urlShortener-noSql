const User = require('../../models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const hashPassword = async (password) => {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password,saltRounds)
  return hashedPassword
}

const createToken = (user)  =>{
  const payload = {
    _id : user._id,
    username : user.username
  }
  const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn :"1h"});
  return token
}




exports.signup =  async (req,res,next) =>{
  try {
    const { password } = req.body
    req.body.passwors = await hashPassword(password)
    const newUser = await User.create(req.body)
    const token = createToken(newUser)
    return res.status(201).json(token)
  } catch (error) {
    return next(error)
  }
  
}
exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('urls');
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};
