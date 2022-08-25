const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // If no token found
  if (!token) {
    return res.status(401).send('No token, authorization denied');
  }

  // Verify token
  try {
    tokenSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, tokenSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};
