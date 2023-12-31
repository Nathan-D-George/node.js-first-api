const User   = require('../models/User');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password){ 
    return res.status(400).json({ 'message':'Name and password required!'}); 
  }

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.sendStatus(401); 
  }
  
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d'}
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: 'None', maxAge:24*60*60*1000});

    res.json({ roles, accessToken });

  } else {
    res.sendStatus(401);
  }
}
module.exports = { handleLogin };
