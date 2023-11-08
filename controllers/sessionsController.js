const User   = require('../models/User');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
require('dotenv').config();

const newSession = async (req, res) => {
  const session  = (req ,res) => {
    res.json({ "message": "new login html page"});
  }
}

const createSession = async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  if (!user || !password) return res.status(400).json({ 'message': 'Username and password are requred' });
  const userFound = await User.findOne({ username: user }).exec();
  if (!userFound) return res.status(401).json({ 'error': 'user not found' });
  // const passwordMatches = await bcrypt.compare(password, userFound.password);
  if (password === userFound.password) {
    const roles = Object.values(userFound.roles).filter(Boolean);
    // res.json({ 'success': `User ${user} is logged in!` });
    const accessToken  = jwt.sign( { "username": userFound.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' } );
    const refreshToken = jwt.sign( { "username": userFound.username }, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' } );
    // Save refreshToken with current user
    // const otherUsers  = usersDB.users.filter(person => person.username !== userFound.username);

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 }) ;
    res.json({ accessToken });
  } else {
    res.status(401).json({ 'error': 'password did not match' });
    // res.status(401).json({ 'error': `given: ${password}; expected: ${userFound.password}` });
  }
}  
   
const endSession = async (req, res) => {
  const user = req.body.firstname;
  res.json({ 'message': `User ${user} logged out.` });
} 
  
module.exports = { newSession, createSession, endSession };  
 
 