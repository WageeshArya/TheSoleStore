const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = res.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    req.userData = decoded;
    next();
  }
  catch(err) {
    console.log(err);
    return res.status(401).json(err => {
      error: err
    })
  }
}