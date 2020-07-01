const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    console.log(req.headers.authorization);

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = decoded;
    next();
  }
  catch(err) {
    console.log(err);
    return res.status(401).json({
      error: err
    })
  }
}