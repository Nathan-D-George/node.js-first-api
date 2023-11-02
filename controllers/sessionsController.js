const User = require('../models/User');

const bcrypt = require('bcrypt');
const newSession = async (req, res) => {
  const session = (req ,res) => {
    res.json({ "message": "new login html [age"});
  }
}

const createSession = async (req, res) => {
  const user = req.body.firstname;
  const password = req.body.password;
  if (!user || !password) return res.status(400).json({ 'message': 'Username and password are requred' });
  const userFound = User.findOne({ firstname: user }).exec(); //usersDB.users.find(person => person.username === user);
  if (!userFound) return res.status(401).json({ 'error': 'user not found' });
  // const passwordMatches = await bcrypt.compare(password, userFound.password);
  if (password === userFound.password) {
    res.json({ 'success': `User ${user} is logged in!` });
  } else {
    // res.sendStatus(401);
    res.status(401).json({ 'error': 'password did not match' });
  }
}

const endSession = async (req, res) => {
  const user = req.body.firstname;
  res.json({ 'message': `User ${user} logged out.` });
} 

module.exports = { newSession, createSession, endSession }; 
