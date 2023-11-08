const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // if (!authHeader?.startsWith('Bearer ')) return req.sendStatus(401);
  const token = authHeader.split(' ')[1];
  console.log( `given ${token}; expected: ${authHeader.split(' ')[1]}` );
  try {
    const user = jwt.verify( token,  process.env.ACCESS_TOKEN_SECRET,  (err, decoded) => {
        if (err) {
          res.clearCookie("jwt");
          return res.redirect("/about");
        }
        
        req.user = decoded.UserInfo;
        // req.roles = decoded.UserInfo.roles; 
        next();
      }

    );
  } catch (err) {
    console.log(err);
    res.clearCookie("jwt");
    return res.redirect("/about");
  }
}

module.exports = verifyJWT;

