const User = require('../models/User');


const createUser = async (req, res) => {
  if (!req?.body?.username || !req?.body?.email || !req?.body?.password){
    return res.status(400).json({ "problem": "username, email and password are all required!" });
  }
  const foundUser = await User.findOne({ "username": req.body.username });
  if (foundUser){
    return res.status(409).json({ "conflict": `User with username '${req.body.username}' already exists. Username must be unique.` })
  }
  try{
    const user = User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    res.status(200).json({ 'message': `User profile for ${user.username} successfully created.`});
  } catch (error) {
    console.log(error);
  }
}

const updateUser = async (req, res) => {
  if (!req?.body?.id){ 
    return res.status(400).json({ 'problem': 'No ID provided.' }); 
  }
  const user = await User.findOne({ '_id': req.body.id });
  if (!user){
    return res.status(400).json({ 'problem': "No user ID matches found "});
  }
  try {
    if (req?.body?.username) { user.username = req.body.username;}
    if (req?.body?.email)    { user.email    = req.body.email;   }
    if (req?.body?.password) { user.password = req.body.password;}
    user.save();
    res.status(200).json({ 'message': 'user account successfully updated!' });
  } catch (error){
    res.sendStatus(400);
    console.log(error);
  }
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'problem': 'No id provided' });
  }
  const user = await User.findOne({ "_id": req.body.id });
  if (!user){
    return res.status(400).json({ 'problem': 'no user matches the ID provided.' });
  }
  try {
    await user.deleteOne();
    res.status(200).json({ 'success': 'User account successfully deleted!' });
  } catch (error){
    console.log(error);
    res.sendStatus(400);
  }
}

const getUser = async (req, res) => {
  if (!req?.params?.id){ 
    return req.status(400).json({ 'problem':'no user id provided' });
  }
  const user = await User.findOne({ "_id": req.params.id});
  if (!user){
    return res.status(400).json({ 'problem': 'No user matches ID provided' });
  }
  try {
    res.status(200).json({ user });
    console.log(user);
  } catch (error){
    console.log(error);
    res.sendStatus(400);
  }
}

const listUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(204).json({ "message":"No users found" });
  }
  try{
    res.json(users);
  } catch (error){
    console.log(error);
  }
}

module.exports = {
  createUser, updateUser, deleteUser, getUser, listUsers
}
