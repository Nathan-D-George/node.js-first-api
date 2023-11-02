const User = require('../models/User');

const createUser = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname || req?.body?.password){
    res.status(400).json({ 'message': 'all fields required' });
  }
  const foundUser = await User.findOne({ firstname: req.body.firstname });
  if (foundUser) return res.status(400).json({ 'message': 'the fields must be filled in as necessary' });
  
  try{
    const newUser = await new User({
      firstname: req.body.firstname,
      lastname:  req.body.lastname,
      password:  req.body.password
    });
    console.log(newUser);
    newUser.save();
  } catch (error){
    console.log(error);
  }
}

module.exports = { createUser }