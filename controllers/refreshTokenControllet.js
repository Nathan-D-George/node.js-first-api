const User = require('../model/User');
const jwt  = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const userFound = await User.findOne({ refreshToken });
  if (!userFound) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET, 
    (err, decoded) => { 
      if (err || userFound.username !== decoded.username) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { "username": decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s'} 
      );
      res.json({ accessToken });
    }
  );
}

module.exports = { handleRefreshToken };
